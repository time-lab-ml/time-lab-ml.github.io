import os
from PIL import Image

def resize_and_center_image(image_path, template_path, output_path, max_size=980):
    """
    Resizes an image to fit within max_size while maintaining aspect ratio,
    centers it on a template image, and saves the output.
    """
    with Image.open(image_path) as img:
        original_width, original_height = img.size
        scale = min(max_size / original_width, max_size / original_height)
        new_width = int(original_width * scale)
        new_height = int(original_height * scale)

        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    with Image.open(template_path) as template:
        template_width, template_height = template.size
        output_img = template.copy()

        x_offset = (template_width - new_width) // 2
        y_offset = (template_height - new_height) // 2

        output_img.paste(resized_img, (x_offset, y_offset), mask=resized_img if resized_img.mode == "RGBA" else None)

    output_img.save(output_path)
    print(f"Saved: {output_path}")

def update_references(file_path, renaming_map):
    """
    Updates all occurrences of old image names with new image names in a file.
    """
    if not os.path.isfile(file_path):
        print(f"Reference file {file_path} not found.")
        return

    with open(file_path, 'r') as file:
        content = file.read()

    for old_name, new_name in renaming_map.items():
        content = content.replace(old_name, new_name)

    with open(file_path, 'w') as file:
        file.write(content)
    print(f"Updated references in {file_path}.")

def process_images(directory, template_image_path, output_directory, reference_file, max_size=980):
    """
    Processes all images in the directory that end with '_unboxed',
    resizing and centering them on a template, and updates references.
    """
    os.makedirs(output_directory, exist_ok=True)
    renaming_map = {}

    for file_name in os.listdir(directory):
        file_base_name = file_name.lower().rsplit('.', 1)[0]
        if file_base_name.endswith("_unboxed"):
            print(f"Processing {file_name}.")
            image_path = os.path.join(directory, file_name)
            new_name = f"{file_base_name.replace('_unboxed', '')}.png"
            output_path = os.path.join(output_directory, new_name)
            resize_and_center_image(image_path, template_image_path, output_path, max_size)
            os.remove(image_path)
            print(f"Removed original file: {image_path}")
            renaming_map[file_name] = new_name

    if renaming_map:
        update_references(reference_file, renaming_map)

if __name__ == "__main__":
    image_directory = "images/paper"
    template_image_path = ".github/scripts/paper_thumbnail/template_box.png"
    output_directory = "images/paper"
    reference_file = "_data/sources.yaml"
    max_dimension = 980

    process_images(image_directory, template_image_path, output_directory, reference_file, max_dimension)

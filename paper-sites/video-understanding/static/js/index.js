window.HELP_IMPROVE_VIDEOJS = false;

const attentionGifGroups = [
    { id: 'motionformer-k400', model: 'motionformer', pretrain: 'k400', label: 'MotionFormer / Kinetics-400' },
    { id: 'motionformer-k600', model: 'motionformer', pretrain: 'k600', label: 'MotionFormer / Kinetics-600' },
    { id: 'motionformer-ssv2', model: 'motionformer', pretrain: 'ssv2', label: 'MotionFormer / Something-Something V2' },
    { id: 'motionformer-ek', model: 'motionformer', pretrain: 'ek', label: 'MotionFormer / EPIC-KITCHENS-100' },
    { id: 'timesformer-k400', model: 'timesformer', pretrain: 'k400', label: 'TimeSformer / Kinetics-400' },
    { id: 'timesformer-k600', model: 'timesformer', pretrain: 'k600', label: 'TimeSformer / Kinetics-600' },
    { id: 'timesformer-ssv2', model: 'timesformer', pretrain: 'ssv2', label: 'TimeSformer / Something-Something V2' },
    { id: 'videomae-k400', model: 'videomae', pretrain: 'k400', label: 'VideoMAE / Kinetics-400' },
    { id: 'videomae-ssv2', model: 'videomae', pretrain: 'ssv2', label: 'VideoMAE / Something-Something V2' },
];

const attentionVideos = [
    { id: 'matcha', label: 'matcha' },
    { id: 'kitchen', label: 'kitchen' },
    { id: 'pour', label: 'pour' },
    { id: 'write', label: 'write' },
    { id: 'instrument', label: 'instrument' },
];

const attentionBlockCount = 12;

function blockGifPath(group, video, blockIndex) {
    const blockName = `block${String(blockIndex).padStart(2, '0')}.gif`;
    return `static/images/gifs/${group.model}/${group.pretrain}/${video.id}/${blockName}`;
}

function createGifCard(group, video, blockIndex) {
    const card = document.createElement('div');
    card.className = 'gif-card';

    const blockNumber = blockIndex + 1;
    const image = document.createElement('img');
    image.src = blockGifPath(group, video, blockIndex);
    image.alt = `${group.label} ${video.label} video block ${blockNumber} attention GIF`;
    image.loading = 'lazy';

    const copy = document.createElement('div');
    copy.className = 'gif-copy';

    const title = document.createElement('h3');
    title.textContent = `Block ${blockNumber}`;

    copy.appendChild(title);
    card.appendChild(image);
    card.appendChild(copy);
    return card;
}

function renderBlockGrid(container, group, video) {
    if (!container || !group || !video) return;
    container.innerHTML = '';
    for (let blockIndex = 0; blockIndex < attentionBlockCount; blockIndex += 1) {
        container.appendChild(createGifCard(group, video, blockIndex));
    }
}

function setupAttentionPlayground() {
    document.querySelectorAll('[data-block-grid]').forEach(grid => {
        const group = attentionGifGroups.find(candidate => candidate.id === grid.dataset.blockGrid);
        const video = attentionVideos.find(candidate => candidate.id === grid.dataset.video);
        renderBlockGrid(grid, group, video);
    });

    const selectA = document.getElementById('compare-a');
    const selectB = document.getElementById('compare-b');
    const videoSelectA = document.getElementById('video-a');
    const videoSelectB = document.getElementById('video-b');
    const gridA = document.getElementById('compare-a-grid');
    const gridB = document.getElementById('compare-b-grid');
    const titleA = document.getElementById('compare-a-title');
    const titleB = document.getElementById('compare-b-title');

    if (!selectA || !selectB || !videoSelectA || !videoSelectB || !gridA || !gridB || !titleA || !titleB) return;

    attentionGifGroups.forEach(group => {
        const optionA = document.createElement('option');
        optionA.value = group.id;
        optionA.textContent = group.label;
        selectA.appendChild(optionA);

        const optionB = document.createElement('option');
        optionB.value = group.id;
        optionB.textContent = group.label;
        selectB.appendChild(optionB);
    });

    attentionVideos.forEach(video => {
        const optionA = document.createElement('option');
        optionA.value = video.id;
        optionA.textContent = video.label;
        videoSelectA.appendChild(optionA);

        const optionB = document.createElement('option');
        optionB.value = video.id;
        optionB.textContent = video.label;
        videoSelectB.appendChild(optionB);
    });

    selectA.value = 'motionformer-k600';
    selectB.value = 'motionformer-ssv2';
    videoSelectA.value = 'instrument';
    videoSelectB.value = 'instrument';

    function updateComparison() {
        const groupA = attentionGifGroups.find(group => group.id === selectA.value);
        const groupB = attentionGifGroups.find(group => group.id === selectB.value);
        const videoA = attentionVideos.find(video => video.id === videoSelectA.value);
        const videoB = attentionVideos.find(video => video.id === videoSelectB.value);
        titleA.textContent = groupA && videoA ? `${groupA.label} / ${videoA.label}` : '';
        titleB.textContent = groupB && videoB ? `${groupB.label} / ${videoB.label}` : '';
        renderBlockGrid(gridA, groupA, videoA);
        renderBlockGrid(gridB, groupB, videoB);
    }

    selectA.addEventListener('change', updateComparison);
    selectB.addEventListener('change', updateComparison);
    videoSelectA.addEventListener('change', updateComparison);
    videoSelectB.addEventListener('change', updateComparison);
    updateComparison();
}

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    if (!dropdown || !button) return;
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        if (!dropdown || !button) return;
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    if (!button) return;
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    if (typeof bulmaCarousel !== 'undefined') {
        bulmaCarousel.attach('.carousel', options);
    }
	
    if (typeof bulmaSlider !== 'undefined') {
        bulmaSlider.attach();
    }
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

    setupAttentionPlayground();

})

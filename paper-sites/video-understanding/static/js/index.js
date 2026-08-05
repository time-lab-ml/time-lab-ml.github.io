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

/* ------------------------------------------------------------------ *
 * Act 1: five-dimension taxonomy explorer (structural codes, Table 2)
 * ------------------------------------------------------------------ */

const taxonomyAxes = ['Motion', 'Temporal', 'Compositional', 'Relational', 'Multimodal'];

// Anchor datasets, structural codes reproduced verbatim from Table 2.
const taxonomyDatasets = [
    {
        id: 'kth', name: 'KTH actions', year: 2004, scale: '2.4K clips', view: 'Third-person',
        codes: { motion: 'H/-/-/-/-', temporal: 'S/Lo', comp: '-/-', rel: '-/-/-', mm: '-/-/-' },
        note: 'Six staged actions, fixed camera, uniform background. High body-motion magnitude is the only structure present, so global spatiotemporal templates suffice.',
        arch: 'Handcrafted descriptors, later two-stream and 3D CNNs (retrospective).'
    },
    {
        id: 'hmdb51', name: 'HMDB51', year: 2011, scale: '6.8K clips', view: 'Third-person',
        codes: { motion: 'M/-/-/+/+', temporal: 'S/Lo', comp: '+/-', rel: 'c/-/c', mm: '-/-/-' },
        note: 'Clips harvested from movies and web video. Camera motion and viewpoint variability arrive together with unconstrained backgrounds, but relations stay contextual: scene appearance is still highly predictive of the label.',
        arch: 'Two-stream networks and 3D CNNs, both introduced on it.'
    },
    {
        id: 'ucf101', name: 'UCF101', year: 2012, scale: '13K clips', view: 'Third-person',
        codes: { motion: 'H/-/-/+/+', temporal: 'S/Lo', comp: '+/-', rel: 'c/-/c', mm: '-/-/-' },
        note: 'Structurally almost a twin of HMDB51 one year later, but with higher motion magnitude from its sports classes. The two were used interchangeably for years, which the identical codes on four of five axes explain.',
        arch: '3D CNNs and TSN, both first reported on it.'
    },
    {
        id: 'ssv2', name: 'Something-Something V2', year: 2018, scale: '221K clips', view: 'Third-person',
        codes: { motion: 'L/+/+/-/+', temporal: 'S/In', comp: '-/-', rel: 't/t/-', mm: '-/-/-' },
        note: 'Deliberately appearance-agnostic: labels are object-agnostic templates, so recognition needs fine-grained, object-centric motion and task-critical object-object relations. Low motion magnitude, high structural demand.',
        arch: 'TRN, then video transformers.'
    },
    {
        id: 'ek100', name: 'EPIC-KITCHENS-100', year: 2020, scale: '90K clips', view: 'Egocentric',
        codes: { motion: 'L/+/+/+/-', temporal: 'S/In', comp: '+/++', rel: 't/c/-', mm: 'D/v/g' },
        note: 'Egocentric hand-object interaction with prominent procedural hierarchy and dense, verified narration alignment. The first anchor where compositional and multimodal structure both become load-bearing.',
        arch: 'TSN/TSM, transformers, video-language models.'
    },
    {
        id: 'ego4d', name: 'Ego4D', year: 2022, scale: '3.7K hours', view: 'Egocentric',
        codes: { motion: 'L/+/+/+/-', temporal: 'L/Lr', comp: '+/++', rel: 't/c/t', mm: 'D/v/d' },
        note: 'Long-horizon egocentric video with dense multi-task annotation: the only anchor that is maximal on temporal horizon, relational structure, and multimodal grounding at the same time.',
        arch: 'Transformers, video-language and foundation models.'
    }
];

// Scoring: every sub-variable of Table 2 contributes a fixed weight; each axis
// is normalised to 0-4. The weights are the only interpretive step and are
// stated on the page next to the chart.
const codeWeights = {
    magnitude: { L: 0, M: 0.5, H: 1 },
    binary: { '-': 0, '+': 1 },
    ego: { '-': 0, '+': 0.5 },
    duration: { S: 0.5, M: 1, L: 1.5 },
    horizon: { Lo: 0.5, In: 1.5, Lr: 2.5 },
    hierarchy: { '-': 0, '+': 1, '++': 2 },
    relation: { '-': 0, c: 0.67, t: 1.33 },
    alignment: { '-': 0, C: 0.5, S: 1, D: 1.5 },
    pairing: { '-': 0, w: 0.4, c: 0.8, v: 1.2 },
    grounding: { '-': 0, s: 0.4, g: 0.8, d: 1.3 }
};

function taxonomyScores(codes) {
    const m = codes.motion.split('/');
    const t = codes.temporal.split('/');
    const c = codes.comp.split('/');
    const r = codes.rel.split('/');
    const x = codes.mm.split('/');
    const w = codeWeights;
    return [
        w.magnitude[m[0]] + w.binary[m[1]] + w.binary[m[2]] + w.ego[m[3]] + w.ego[m[4]],
        w.duration[t[0]] + w.horizon[t[1]],
        w.hierarchy[c[0]] + w.hierarchy[c[1]],
        r.reduce((sum, code) => sum + w.relation[code], 0),
        w.alignment[x[0]] + w.pairing[x[1]] + w.grounding[x[2]]
    ];
}

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
}

function radarPoint(cx, cy, radius, axisIndex, value, max) {
    const angle = (Math.PI * 2 * axisIndex) / taxonomyAxes.length - Math.PI / 2;
    const r = (value / max) * radius;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function renderRadar(container, dataset) {
    if (!container) return;
    const W = 460;
    const H = 370;
    const cx = W / 2;
    const cy = H / 2 + 6;
    const radius = 112;
    const max = 4;
    const scores = taxonomyScores(dataset.codes);

    container.innerHTML = '';
    const svg = svgEl('svg', {
        viewBox: `0 0 ${W} ${H}`, class: 'radar-svg',
        role: 'img',
        'aria-label': `${dataset.name} structural profile across the five taxonomy dimensions`
    });

    for (let ring = 1; ring <= max; ring += 1) {
        const pts = taxonomyAxes
            .map((_, i) => radarPoint(cx, cy, radius, i, ring, max).map(v => v.toFixed(1)).join(','))
            .join(' ');
        svg.appendChild(svgEl('polygon', { points: pts, class: 'radar-ring' }));
    }

    taxonomyAxes.forEach((axis, i) => {
        const [x, y] = radarPoint(cx, cy, radius, i, max, max);
        svg.appendChild(svgEl('line', { x1: cx, y1: cy, x2: x.toFixed(1), y2: y.toFixed(1), class: 'radar-spoke' }));

        const [lx, ly] = radarPoint(cx, cy, radius + 22, i, max, max);
        const label = svgEl('text', {
            x: lx.toFixed(1), y: ly.toFixed(1), class: 'radar-axis-label',
            'text-anchor': lx > cx + 4 ? 'start' : (lx < cx - 4 ? 'end' : 'middle'),
            'dominant-baseline': 'middle'
        });
        label.textContent = axis;
        svg.appendChild(label);
    });

    const shape = taxonomyAxes
        .map((_, i) => radarPoint(cx, cy, radius, i, scores[i], max).map(v => v.toFixed(1)).join(','))
        .join(' ');
    svg.appendChild(svgEl('polygon', { points: shape, class: 'radar-shape' }));

    taxonomyAxes.forEach((axis, i) => {
        const [x, y] = radarPoint(cx, cy, radius, i, scores[i], max);
        const dot = svgEl('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 4, class: 'radar-dot' });
        const title = svgEl('title', {});
        title.textContent = `${axis}: ${scores[i].toFixed(2)} / 4`;
        dot.appendChild(title);
        svg.appendChild(dot);
    });

    container.appendChild(svg);
}

const codeSlots = [
    { key: 'motion', axis: 'Motion', legend: 'magnitude / fine-grained / object-centric / camera or ego / viewpoint' },
    { key: 'temporal', axis: 'Temporal', legend: 'duration class / effective reasoning horizon' },
    { key: 'comp', axis: 'Compositional', legend: 'semantic hierarchy / procedural hierarchy' },
    { key: 'rel', axis: 'Relational', legend: 'human-object / object-object / social or multi-agent' },
    { key: 'mm', axis: 'Multimodal', legend: 'temporal alignment / pairing quality / grounding density' }
];

function renderDatasetDetail(dataset) {
    const scores = taxonomyScores(dataset.codes);
    const meta = document.getElementById('taxonomy-meta');
    const codeList = document.getElementById('taxonomy-codes');
    const note = document.getElementById('taxonomy-note');
    if (!meta || !codeList || !note) return;

    meta.innerHTML = '';
    [`${dataset.year}`, dataset.scale, dataset.view].forEach(text => {
        const chip = document.createElement('span');
        chip.className = 'meta-chip';
        chip.textContent = text;
        meta.appendChild(chip);
    });

    codeList.innerHTML = '';
    codeSlots.forEach((slot, i) => {
        const row = document.createElement('div');
        row.className = 'code-row';
        row.innerHTML = `
          <span class="code-axis">${slot.axis}</span>
          <code class="code-value">${dataset.codes[slot.key]}</code>
          <span class="code-bar"><span style="width:${(scores[i] / 4) * 100}%"></span></span>
          <span class="code-score">${scores[i].toFixed(1)}</span>
          <span class="code-legend">${slot.legend}</span>`;
        codeList.appendChild(row);
    });

    note.innerHTML = `<p>${dataset.note}</p><p class="code-arch"><strong>Associated model families:</strong> ${dataset.arch}</p>`;
}

function setupTaxonomyExplorer() {
    const chipBar = document.getElementById('taxonomy-chips');
    const radar = document.getElementById('taxonomy-radar');
    const heading = document.getElementById('taxonomy-name');
    if (!chipBar || !radar || !heading) return;

    function select(dataset) {
        chipBar.querySelectorAll('button').forEach(button => {
            const active = button.dataset.dataset === dataset.id;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        heading.textContent = dataset.name;
        renderRadar(radar, dataset);
        renderDatasetDetail(dataset);
    }

    taxonomyDatasets.forEach(dataset => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'chip';
        button.dataset.dataset = dataset.id;
        button.textContent = dataset.name;
        button.addEventListener('click', () => select(dataset));
        chipBar.appendChild(button);
    });

    select(taxonomyDatasets.find(dataset => dataset.id === 'ssv2') || taxonomyDatasets[0]);
}

/* Full-size figure preview. Native <dialog> gives Esc, focus trap and
 * backdrop for free, so this only wires up the content. */
function setupFigureLightbox() {
    const dialog = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const text = document.getElementById('lightbox-text');
    if (!dialog || !image || !title || !text) return;

    document.querySelectorAll('.figure-grid .figure-card').forEach(card => {
        const thumb = card.querySelector('img');
        if (!thumb) return;
        thumb.tabIndex = 0;
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('aria-label', `Enlarge figure: ${card.querySelector('h3')?.textContent || ''}`);

        function open() {
            image.src = thumb.src;
            image.alt = thumb.alt;
            title.textContent = card.querySelector('h3')?.textContent || '';
            text.textContent = card.querySelector('.figure-copy p')?.textContent || '';
            dialog.showModal();
        }

        thumb.addEventListener('click', open);
        thumb.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                open();
            }
        });
    });

    // Click the backdrop (anything that is not the image or caption) to close.
    dialog.addEventListener('click', event => {
        if (event.target === dialog || event.target.closest('[data-close]')) dialog.close();
    });
    dialog.addEventListener('close', () => { image.src = ''; });
}

/* ------------------------------------------------------------------ *
 * Act 3: benchmark-architecture co-evolution timeline (Table 7)
 * ------------------------------------------------------------------ */

// One row per family so labels never collide; rows are ordered by first
// publication year, which is also the node's position on the axis.
const timelineFamilies = [
    { id: '2s', label: 'Two-stream', year: 2014, row: 0 },
    { id: '3d', label: '3D CNN (I3D, SlowFast)', year: 2014, row: 1 },
    { id: 'fusion', label: 'CNN + temporal fusion', year: 2014, row: 2 },
    { id: 'det', label: 'Region CNN detector', year: 2015, row: 3 },
    { id: 'tsn', label: 'TSN / TSM', year: 2016, row: 4 },
    { id: 'trn', label: 'TRN', year: 2017, row: 5 },
    { id: 'stgcn', label: 'ST-GCN', year: 2018, row: 6 },
    { id: 'trf', label: 'Video transformer', year: 2021, row: 7 },
    { id: 'vlm', label: 'Video-language model', year: 2021, row: 8 }
];

// Benchmark rows cycle through five lanes in year order, so no two labels
// that are close on the axis ever share a lane.
const timelineBenchmarks = [
    { name: 'KTH', year: 2004, row: 0, families: ['2s', '3d'], type: 'R', note: 'Staged actions, high motion magnitude only. The listed families postdate it by a decade: the association is retrospective, not causal.' },
    { name: 'UCF101', year: 2012, row: 1, families: ['3d', 'tsn'], type: 'I', note: 'In-the-wild appearance diversity with contextual relations. Two-stream and 3D convolution were introduced or first reported on it.' },
    { name: 'Sports-1M', year: 2014, row: 2, families: ['fusion', '3d'], type: 'I', note: 'Scale first becomes the design pressure: temporal fusion over 2D CNNs, then 3D convolution.' },
    { name: 'NTU RGB+D 60', year: 2016, row: 3, families: ['stgcn'], type: 'I', note: 'Hardware-paired skeleton streams (coded D/v/-) motivate graph convolution over joints rather than pixels.' },
    { name: 'Kinetics-400', year: 2017, row: 4, families: ['3d', 'trf'], type: 'I', note: 'I3D was introduced here; the benchmark then becomes the default pretraining corpus for every later family.' },
    { name: 'Something-Something V2', year: 2018, row: 0, families: ['trn', 'trf'], type: 'I', note: 'Object-centric motion and task-critical object-object relations make appearance priors useless. TRN introduced here.' },
    { name: 'AVA', year: 2018, row: 1, families: ['3d', 'det', 'trf'], type: 'I', note: 'Concurrent actions by multiple actors force detection plus spatiotemporal reasoning in one model.' },
    { name: 'EPIC-KITCHENS-100', year: 2020, row: 2, families: ['tsn', 'trf', 'vlm'], type: 'E', note: 'Egocentric hand-object interaction with segment-level narration: the transition point toward interaction- and language-aware models.' },
    { name: 'WebVid-2M/10M', year: 2021, row: 3, families: ['vlm'], type: 'I', note: 'Weakly paired video-text at scale. Video-language pretraining is first reported on it.' },
    { name: 'Ego4D', year: 2022, row: 4, families: ['trf', 'vlm'], type: 'E', note: 'Long-horizon, densely grounded egocentric video: the current pressure toward video foundation models.' }
];

const associationClass = { I: 'is-introduced', E: 'is-evaluated', R: 'is-retrospective' };

function setupTimeline() {
    const host = document.getElementById('coevolution-timeline');
    const detail = document.getElementById('timeline-detail');
    if (!host || !detail) return;

    const W = 1180;
    const H = 610;
    const padX = 76;
    const yearMin = 2004;
    const yearMax = 2026;
    const xOf = year => padX + ((year - yearMin) / (yearMax - yearMin)) * (W - 2 * padX);
    const benchRowY = [34, 78, 122, 166, 210];
    const famRowY = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(row => 322 + row * 31);
    const axisY = 268;

    const svg = svgEl('svg', {
        viewBox: `0 0 ${W} ${H}`, class: 'timeline-svg',
        role: 'img',
        'aria-label': 'Timeline of benchmark datasets above and architecture families below, connected by association type'
    });

    svg.appendChild(svgEl('line', { x1: padX - 30, y1: axisY, x2: W - padX + 30, y2: axisY, class: 'timeline-axis' }));
    for (let year = yearMin; year <= yearMax; year += 2) {
        const x = xOf(year);
        svg.appendChild(svgEl('line', { x1: x, y1: axisY - 5, x2: x, y2: axisY + 5, class: 'timeline-tick' }));
        const label = svgEl('text', { x: x, y: axisY + 22, class: 'timeline-year', 'text-anchor': 'middle' });
        label.textContent = year;
        svg.appendChild(label);
    }

    const famX = {};
    const famY = {};
    timelineFamilies.forEach(family => {
        famX[family.id] = xOf(family.year);
        famY[family.id] = famRowY[family.row];
    });

    // Connectors first so nodes draw on top.
    timelineBenchmarks.forEach(bench => {
        bench.families.forEach(id => {
            const y1 = benchRowY[bench.row] + 14;
            const y2 = famY[id];
            const mid = (y1 + y2) / 2;
            const path = svgEl('path', {
                d: `M ${xOf(bench.year)} ${y1} C ${xOf(bench.year)} ${mid}, ${famX[id]} ${mid}, ${famX[id]} ${y2}`,
                class: `timeline-link ${associationClass[bench.type]}`,
                'data-bench': bench.name
            });
            svg.appendChild(path);
        });
    });

    timelineFamilies.forEach(family => {
        const g = svgEl('g', { class: 'timeline-family', 'data-family': family.id });
        g.appendChild(svgEl('circle', { cx: famX[family.id], cy: famY[family.id], r: 5, class: 'timeline-fam-dot' }));
        const text = svgEl('text', { x: famX[family.id] + 10, y: famY[family.id] + 4, class: 'timeline-fam-label' });
        text.textContent = `${family.label} (${family.year})`;
        g.appendChild(text);
        svg.appendChild(g);
    });

    timelineBenchmarks.forEach(bench => {
        const x = xOf(bench.year);
        const y = benchRowY[bench.row];
        const g = svgEl('g', { class: `timeline-bench ${associationClass[bench.type]}`, tabindex: '0', role: 'button' });
        g.appendChild(svgEl('circle', { cx: x, cy: y + 14, r: 5, class: 'timeline-bench-dot' }));
        const text = svgEl('text', { x: x, y: y, class: 'timeline-bench-label', 'text-anchor': 'middle' });
        text.textContent = `${bench.name} · ${bench.year}`;
        g.appendChild(text);

        function show() {
            svg.querySelectorAll('.timeline-bench').forEach(node => node.classList.remove('is-active'));
            svg.querySelectorAll('.timeline-link').forEach(node => {
                node.classList.toggle('is-active', node.getAttribute('data-bench') === bench.name);
            });
            g.classList.add('is-active');
            const families = bench.families
                .map(id => timelineFamilies.find(family => family.id === id).label)
                .join(', ');
            const typeText = { I: 'Introduced (I)', E: 'Commonly evaluated (E)', R: 'Retrospective (R) - not evidence of causation' }[bench.type];
            detail.innerHTML = `<h4>${bench.name} <span>${bench.year}</span></h4>
              <p class="timeline-assoc"><span class="assoc-tag ${associationClass[bench.type]}">${typeText}</span> ${families}</p>
              <p>${bench.note}</p>`;
        }

        g.addEventListener('click', show);
        g.addEventListener('mouseenter', show);
        g.addEventListener('focus', show);
        g.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                show();
            }
        });
        svg.appendChild(g);
        if (bench.name === 'Something-Something V2') bench.show = show;
    });

    host.appendChild(svg);
    const initial = timelineBenchmarks.find(bench => bench.show);
    if (initial) initial.show();
}

/* Matched comparisons, Table 8. Values reproduced unchanged. */

const matchedCases = {
    case3: {
        title: 'Case 3 - representation fixed, benchmark varies',
        lead: 'V-JEPA 2, frozen encoder with an attentive probe: the representation is identical across all three benchmarks, so the differences are properties of what each benchmark requires.',
        rows: [
            { label: 'Diving48', code: 'H/+/-/+/- · S/In · -/-/-', value: 90.2, tone: 'high' },
            { label: 'Kinetics-400', code: 'H/-/-/+/+ · S/Lo · c/-/c', value: 87.3, tone: 'mid' },
            { label: 'Something-Something V2', code: 'L/+/+/+/+ · S/In · t/t/-', value: 77.3, tone: 'low' }
        ],
        takeaway: 'The benchmark with the <strong>highest</strong> motion magnitude is the easiest, and the one with the <strong>lowest</strong> is the hardest. Difficulty tracks object-centric and relational structure, not motion magnitude. Residual confound: frame and view counts differ per benchmark (32 frames / 4x3 on Diving48, 16 / 8x3 on K400, 16 / 2x3 on SSv2).'
    },
    case1: {
        title: 'Case 1 - benchmark pair fixed, architecture and pretraining vary',
        lead: 'Six models, each reporting Kinetics-400 and Something-Something V2 in a single publication. K400 accuracy climbs 6.3 points as pretraining moves from supervised ImageNet-21k to large-scale self-supervision.',
        pairs: [
            { label: 'Motionformer', pre: 'IN-21k (+K400)', a: 81.1, b: 68.1 },
            { label: 'Swin', pre: 'IN-21k', a: 84.9, b: 69.6 },
            { label: 'MViTv2', pre: 'IN-21k', a: 86.1, b: 73.3 },
            { label: 'MaskFeat', pre: 'SSL K400/K600', a: 87.0, b: 75.0 },
            { label: 'VideoMAE', pre: 'SSL target set', a: 87.4, b: 75.4 },
            { label: 'V-JEPA 2', pre: 'SSL VideoMix22M', a: 87.3, b: 77.3 }
        ],
        takeaway: 'The K400 - SSv2 gap never closes: 13.0, 15.3, 12.8, 12.0, 12.0, 10.0 points. A gap that survives supervised transformers, masked autoencoders and joint-embedding encoders alike is more plausibly a property of what the two benchmarks require than of any architectural family.'
    }
};

function renderMatchedCase(key) {
    const host = document.getElementById('matched-chart');
    if (!host) return;
    const data = matchedCases[key];
    const scale = value => `${((value - 60) / 35) * 100}%`;

    let bars = '';
    if (data.rows) {
        bars = data.rows.map(row => `
          <div class="bar-row">
            <span class="bar-label">${row.label}<em>${row.code}</em></span>
            <span class="bar-track"><span class="bar-fill is-${row.tone}" style="width:${scale(row.value)}"></span></span>
            <span class="bar-value">${row.value.toFixed(1)}</span>
          </div>`).join('');
    } else {
        bars = data.pairs.map(pair => `
          <div class="bar-row is-pair">
            <span class="bar-label">${pair.label}<em>${pair.pre}</em></span>
            <span class="bar-track">
              <span class="bar-fill is-mid" style="width:${scale(pair.a)}"></span>
              <span class="bar-fill is-low" style="width:${scale(pair.b)}"></span>
            </span>
            <span class="bar-value">${pair.a.toFixed(1)} / ${pair.b.toFixed(1)}<em>&Delta; ${(pair.a - pair.b).toFixed(1)}</em></span>
          </div>`).join('');
    }

    // Each pair plots the same two benchmarks, so name them by colour once
    // instead of repeating "upper/lower" per row.
    const legend = data.pairs ? `
      <p class="bar-legend">
        <span><i class="bar-swatch is-mid"></i>Kinetics-400</span>
        <span><i class="bar-swatch is-low"></i>Something-Something V2</span>
      </p>` : '';

    host.innerHTML = `
      <h4 class="matched-title">${data.title}</h4>
      <p class="matched-lead">${data.lead}</p>
      ${legend}
      <div class="bar-chart" role="img" aria-label="${data.title}: top-1 accuracy comparison">${bars}</div>
      <p class="matched-axis">Bars are scaled from 60% to 95% top-1 accuracy.</p>
      <p class="matched-takeaway">${data.takeaway}</p>`;
}

function setupMatchedComparisons() {
    const tabs = document.getElementById('matched-tabs');
    if (!tabs) return;
    tabs.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            tabs.querySelectorAll('button').forEach(other => {
                const active = other === button;
                other.classList.toggle('is-active', active);
                other.setAttribute('aria-pressed', String(active));
            });
            renderMatchedCase(button.dataset.case);
        });
    });
    renderMatchedCase('case3');
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
    setupTaxonomyExplorer();
    setupFigureLightbox();
    setupTimeline();
    setupMatchedComparisons();

})

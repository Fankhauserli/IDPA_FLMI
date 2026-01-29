document.addEventListener('DOMContentLoaded', function () {
    const valveSlider = document.getElementById('valve-slider');
    const valveConnection = document.getElementById('valve-connection');
    const weightValueDisplay = document.getElementById('valve-weight-value');
    const outputValueDisplay = document.getElementById('valve-output-value');
    const inputValueDisplay = document.getElementById('valve-input-value');

    if (valveSlider && valveConnection) {
        valveSlider.addEventListener('input', function () {
            const value = parseFloat(this.value);
            const inputVal = parseFloat(inputValueDisplay.innerText) || 1.0;

            // Update Text Displays
            if (weightValueDisplay) weightValueDisplay.innerText = `Weight: ${value.toFixed(1)}`;
            if (outputValueDisplay) {
                const output = (inputVal * value).toFixed(2);
                outputValueDisplay.innerText = output;
            }

            // Normalize value from -1 to 1 to 0.1 to 10 for width, or similar
            // Let's say range is -10 to 10 in UI

            const width = Math.abs(value) * 1.5 + 1; // Min width 1px

            valveConnection.style.height = width + 'px';

            if (value > 0) {
                valveConnection.style.backgroundColor = '#4d25fc'; // Blue
                valveConnection.style.borderTop = 'none';
            } else if (value < 0) {
                valveConnection.style.backgroundColor = 'transparent';
                valveConnection.style.borderTop = width + 'px dashed #ff4d4d'; // Red dashed
                valveConnection.style.height = '0px'; // For border to work as line
            } else {
                valveConnection.style.backgroundColor = '#ccc';
                valveConnection.style.height = '1px';
                valveConnection.style.borderTop = 'none';
            }
        });
    }

    // RGB Interactive Element
    const rgbBox = document.getElementById('rgb-result-box');
    const sliderR = document.getElementById('slider-r');
    const sliderG = document.getElementById('slider-g');
    const sliderB = document.getElementById('slider-b');

    const valR = document.getElementById('val-r');
    const valG = document.getElementById('val-g');
    const valB = document.getElementById('val-b');

    const vecR = document.getElementById('vec-r');
    const vecG = document.getElementById('vec-g');
    const vecB = document.getElementById('vec-b');

    function updateRGB() {
        if (!rgbBox || !sliderR || !sliderG || !sliderB) return;

        const r = sliderR.value;
        const g = sliderG.value;
        const b = sliderB.value;

        rgbBox.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        if (valR) valR.innerText = r;
        if (valG) valG.innerText = g;
        if (valB) valB.innerText = b;

        if (vecR) vecR.innerText = r;
        if (vecG) vecG.innerText = g;
        if (vecB) vecB.innerText = b;
    }

    if (sliderR && sliderG && sliderB) {
        sliderR.addEventListener('input', updateRGB);
        sliderG.addEventListener('input', updateRGB);
        sliderB.addEventListener('input', updateRGB);
        // Initialize
        updateRGB();
    }
});

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

    // RGB Interactive Element logic has been moved to /js/rgb_cube.js for 3D visualization
});

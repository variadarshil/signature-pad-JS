window.onload = function() {
    let canvas = document.getElementById('signature-pad');
    let ctx = canvas.getContext('2d');
    let clearButton = document.getElementById('clear-button');
    let saveButton = document.getElementById('save-button');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    clearButton.addEventListener('click', clearSignature);
    saveButton.addEventListener('click', downloadSignature);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY]
    }
    function draw(e) {
        if(!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX,  e.offsetY);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = "#ffffff";
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY]
    }
    function stopDrawing() {
        isDrawing = false;
    }
    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        [lastX, lastY] = [0,0]
    }
    function downloadSignature() {
        if (lastX == 0 && lastY == 0) return alert('You need to sign to download')
        const signature = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = signature;
        link.download = 'signature.png';
        //Append link to body
        document.body.appendChild(link);
        //click the link
        link.click();
        //remove link from the body
        document.body.removeChild(link);
    }
}
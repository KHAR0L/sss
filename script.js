const lyricsContainer = document.querySelector("#lyricsContainer");
let lines = document.querySelectorAll(".line");
let currentIndex = 0;

function splitLongLines() {
    lines.forEach(line => {
        if (line.textContent.length > 30) {
            const words = line.textContent.split(' ');
            const midPoint = Math.floor(words.length / 2);
            const part1 = words.slice(0, midPoint).join(' ');
            const part2 = words.slice(midPoint).join(' ');

            const newLine = document.createElement('div');
            newLine.classList.add('line');
            newLine.textContent = part2;

            line.textContent = part1;
            line.parentNode.insertBefore(newLine, line.nextSibling);
        }
    });
    lines = document.querySelectorAll(".line");
}

function updateLyrics() {
    lines.forEach((line, index) => {
        line.classList.remove("active", "near");
        line.style.transform = `translateY(${(index - currentIndex) * 1.5}em)`;

        if (index === currentIndex) {
            line.classList.add("active");
        } else if (index === currentIndex - 1 || index === currentIndex + 1) {
            line.classList.add("near");
        }
    });

    const lineLength = lines[currentIndex].textContent.length;
    const duration = Math.max(0.4, Math.min(1.5, lineLength / 20));

    currentIndex = (currentIndex + 1) % lines.length;
    setTimeout(updateLyrics, duration * 1000);
}

splitLongLines();
updateLyrics();
window.onload = function() {
    // Ajustar el volumen del audio al 40%
    const audio = document.getElementById('background-audio');
    if (audio) {
        audio.volume = 0.4;
    }

    // Aplicar el efecto de fade-in
    document.body.style.opacity = '1';
};


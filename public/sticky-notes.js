const stack = document.querySelectorAll('.sticky');

stack.forEach((note) => {
  let x = 0, y = 0;

  interact(note).draggable({
    listeners: {
      move (event) {
        x += event.dx;
        y += event.dy;
        note.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random()*6-3}deg)`;
      },
      end (event) {
        
        const threshold = window.innerWidth / 8;
        if (Math.abs(x) > threshold) {
          const direction = x > 0 ? 1 : -1;
          note.style.transition = 'transform 0.5s ease-in';
          note.style.transform = `translate(${direction * window.innerWidth}px, ${y}px) rotate(${direction*45}deg)`;
          setTimeout(() => note.remove(), 500);
        } else {
          
          note.style.transition = 'transform 0.2s ease';
          note.style.transform = `rotate(${Math.random()*6-3}deg)`;
          x = 0; y = 0;
          setTimeout(() => note.style.transition = '', 200);
        }
      }
    }
  });
});


const stickies = document.querySelectorAll("#sticky-stack .sticky");

stickies.forEach((note, i) => {
  const offsetX = (Math.random() - 0.5) * 10;
  const offsetY = i; 
  note.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  note.style.position = "absolute"; 
  note.style.zIndex = stickies.length - i;
});

document.getElementById("sticky-stack").style.position = "relative";

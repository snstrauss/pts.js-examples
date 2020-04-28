export default function basic(){
    space.add({
        animate: (t, ft) => {
            form.point(space.pointer, 10, 'circle');
        }
    });

    space.bindMouse().bindTouch().play();

}
export default function square(){

    space.add({
        animate: (t, ft) => {
            form.point(space.pointer, 40, 'square');
        }
    });

    space.bindMouse().bindTouch().play();
}

import { Rectangle, Num, Triangle } from "../lib/pts";

const timeFactor = 5000;

export default function basic(){

    space.add({
        animate: (time) => {
            const rect = Rectangle.fromCenter(space.center, space.size.$divide(2));
            const polygon = Rectangle.corners(rect);

            // Num.cycle gives us cycled values -
            // time % timeFactor / timeFactor is used to normalize the time to be between 0 and 1 (on a scale of 0 to timeFactor)
            // -0.5 will make the value cycle between -0.5 and 0.5
            const shearing = (Num.cycle(time % timeFactor / timeFactor) - 0.5) / 2;

            // make the polygon slanted (sheared)
            polygon.shear2D(shearing, space.center);

            // get the polygon (4 points) segments (4 groups of 2 points - 4 lines)
            // these segments will be the base of the triangles
            const triangles = polygon.segments(2, 1, true);

            // add to each triangle it's 3rd point - the cursor (space.pointer)
            triangles.forEach(tri => {
                tri.push(space.pointer);
            });

            // we map each triangle, and use the Triangle.incircle method, to create a circle
            const circles = triangles.map(tri => {
                return Triangle.incircle(tri);
            });


            // paint all the elements -
            // sheared polygon
            form.fillOnly('blue').polygon(polygon);
            // base rectangle
            form.strokeOnly('red', 2).rect(rect);
            // triangles
            form.strokeOnly('green', 2).polygons(triangles);
            // circles
            form.fill('deeppink').stroke('black', 1).circles(circles);
            // pointer point
            form.fill('red').stroke('black', 1).point(space.pointer, 10, 'circle');
        }
    });

    space.bindMouse().bindTouch().play();
}
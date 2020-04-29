import { Create, Form, Pt, Bound, Circle, Num } from "../lib/pts";

export default function square(){

    const PTS_COUNT = 2500;
    const CIRCLE_RADIUS = 150;
    const colors = ['#0074D9', '#FFDC00', '#FF4136', '#01FF70'];

    /**
     * before the animation the space has wrong bound,
     * so we're making a clone of it, and changing its topLeft.
     * changing the space.bound itself will cause the points to be rendered wrong
     */
    const boundSpace = space.bound.clone();
    boundSpace.topLeft = [0,0];

    // create an array of random pts in bound
    const points = Create.distributeRandom(boundSpace, PTS_COUNT);


    space.clear('#123');
    space.add(animation);

    function animation(time){

        // calculate absolute distance from pointer to center
        const distanceFromCenter = Math.abs(space.pointer.x - space.center.x);
        /**
         * dividing the distance by the center value will give us normalized value -
         * when pointer.x is 0 distance is the value of space.center (abs(0 - center.x)),
         * same for when pointer.x is at max.
         *
         * dividing that value (equal to center.x on limits) by the same value will
         * make the limits return a value of 1, and the center return value of 0
         */
        const normalizedDistance = distanceFromCenter / space.center.x;

        // radius of 1 is too small, so we multiply it by 150, just do it will be visible
        // we want to have a visible circle in the center as well, so we add 70
        const radius = normalizedDistance * 150 + 70;

        // create a circle with variable radius around the pointer
        const rangeAroundPointer = Circle.fromCenter(space.pointer, radius);

        const sortedPts = {
            in: [],
            out: []
        }

        points.forEach((pt, i) => {
            // give each point a set color, and sort them to 'in range' and 'out of range'
            // i will always be the same for each pt, so the color will be the same
            pt.ptColor = colors[i % colors.length];
            sortedPts[Circle.withinBound(rangeAroundPointer, pt) ? 'in' : 'out'].push(pt);
        });

        sortedPts.in.forEach((pt, i) => {
            /**
             * we want the points to be larger when close to the pointer,
             * and have a fish-eye lens effect
             */

            // get distance from pt to pointer
            const dist = pt.$subtract(space.pointer).magnitude();
            // when pt is as far as the radius - return 0
            // when pt is rally close to pointer - (radius - dist) / radius will return 1
            const normalizedDist = (radius - dist) / radius;

            // create a new pt, based on the original pt.
            // add(pointer) gives the new pts an origin - the pointer
            // (using space.center) will make the pts form around center
            // scale gives it the distance from the origin pt (pointer)
            // (using 1+norm, so the scale will be 1.3, 1.7 etc... (norm is 0 - 1))
            // let p = pt.$subtract( space.pointer ).scale( 1 + normalizedDist ).add(space.pointer);
            let p = pt.$subtract( space.pointer ).scale( 1 + normalizedDist ).add(space.pointer);

            // render the pt. giving radius of (norm * 25), because norm is 0-1
            form.fillOnly( pt.ptColor ).point( p, normalizedDist*25, "circle" );
        });

        // render non enlarged pts.
        form.fillOnly('#DDD').points(sortedPts.out, 1, 'circle');
    }

    space.bindMouse().bindTouch().play();
}

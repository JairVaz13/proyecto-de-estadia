AFRAME.registerComponent('navigation-listener', {
    schema: {
        target: {type: 'string'}
    },
    init: function () {
        var el = this.el;
        var targetId = this.data.target;
        var currentScene = el.sceneEl;

        el.addEventListener('click', function () {
            var currentSky = currentScene.querySelector('a-sky[visible="true"]');
            var targetSky = document.getElementById(targetId);

            if (currentSky && targetSky) {
                currentSky.setAttribute('visible', 'false');
                targetSky.setAttribute('visible', 'true');
            }
        });
    }
});

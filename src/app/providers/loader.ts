declare var $;

export class Loader {
    static present(opacity = 0.8) {
        $('body').css('overflow', 'hidden');
        $('.backdrop-blur').css('display', 'block');
        $('.backdrop-blur').css('opacity', opacity);
    }
    static dismiss() {
        $('body').css('overflow', 'auto');
        $('.backdrop-blur').css('display', 'none');
        $('.backdrop-blur').css('opacity', 0.8);
    }
}

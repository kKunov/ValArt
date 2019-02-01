var main = {};

!function () {
    var $body = $("body"),
        galleryLoaded = false;

    main.nextPrevBtnClicked = function nextPrevBtnClicked(e) {
        var $slider,
            $img,
            $view,
            imgHeight,
            imgWidth,
            newImgWidth,
            newImgHeight,
            $html;
            
        onResizeDesideIfItIsPhoneStanding();

        if (!$('.k-nav-bar > .active').hasClass('k-galleries-navbar')){
            return;
        }

        $slider = $('#k-gallery-slider');
        $view = $slider.closest('.k-single-gal');
        $img = $slider.find(".active > img");
        imgHeight = $img.height();
        imgWidth = $img.width();
        newImgWidth;
        $html = $('html');

        if ($html.width >= $html.height) {
            if (imgHeight > imgWidth) {
                removeStylesOfTheGalViewHtml($slider, $img, $view);

                $img.attr('style', 'max-height: 63vh;');
                newImgWidth = $img.width();
                $slider.attr("style", "max-width: " + newImgWidth + "px;");
                $slider.closest(".k-single-gal").attr("style", "left: calc(56vw + (14vw - " + (newImgWidth / 2) + "px));");
            }
            else {
                removeStylesOfTheGalViewHtml($slider, $img, $view);

                $img.attr('style', 'max-width: 50vw;');
                newImgHeight = $img.height();
                $slider.attr("style", "max-height: " + newImgHeight + "px;");
            }
        }
    };

    function onResizeDesideIfItIsPhoneStanding() {
        var $html = $('html');

        if ($html.height() > $html.width()) {
            $('.k-nav').addClass('phone');
            $('.k-top-right-container').addClass('phone');
            $('.k-val-kun-logo').addClass('phone');
            $('.k-single-gal').addClass('phone');
            $('.k-bottom-left-container').addClass('phone');
            $('.k-bio-view').addClass('phone');
        }
        else {
            $('.k-nav').removeClass('phone');
            $('.k-top-right-container').removeClass('phone');
            $('.k-val-kun-logo').removeClass('phone');
            $('.k-single-gal').removeClass('phone');
            $('.k-bottom-left-container').removeClass('phone');
            $('.k-bio-view').removeClass('phone');
        }
    }

    function galClicked() {
        var $indexatorContainer = $(".k-indexator-container"),
            $imagesContainer = $(".k-images-container"),
            $div,
            $img,
            classActive = "\" class=\"active\"",
            i;
        
        if (galleryLoaded) {
            main.nextPrevBtnClicked();
            return;
        }

        $indexatorContainer.empty();
        $imagesContainer.empty();

        jQuery.get('galleries/galleriNamesInFolder', function(result) {
            for (i = 0; i < result.length; i++) {
                if (i === 0) {
                    $indexatorContainer.append(
                        "<li data-target=\"#k-gallery-slider\" data-slide-to=\"" + i + classActive + "\"></li>"
                    );

                    $imagesContainer.append(
                        "<div class=\"item" + (i === 0 ? " active" : "") + "\">" + 
                        "<img src='images/gal/" + result[i] + "' onload='main.nextPrevBtnClicked();'></div>"
                    );
                }
                else {
                    $indexatorContainer.append(
                        "<li data-target=\"#k-gallery-slider\" data-slide-to=\"" + i + "\"></li>"
                    );
    
                    $imagesContainer.append(
                        "<div class=\"item\">" + 
                        "<img src=\"images/gal/" + result[i] + "\"></div>"
                    );
                }
            }

            galleryLoaded = true;
        });
    }
    
    function removeStylesOfTheGalViewHtml($slider, $img, $view) {
        $img.removeAttr("style");
        $slider.removeAttr("style");
        $view.removeAttr("style");
    }

    function handleNavClicke(e) {
        var $this = $(this);
        
        $this.siblings('.active').removeClass('active');
        $this.addClass('active');

        $(".k-page-views").attr("style" ,"display:none;");

        if ($this.hasClass('k-biography')) {
            $('.k-bio-view').removeAttr('style');
        }
        else if ($this.hasClass('k-galleries-navbar')){
            $(".k-single-gal").removeAttr("style");
            galClicked();
        }
        else if ($this.hasClass('k-contacts')) {
            $(".k-contacts-view").removeAttr("style");
        }
    }

    onResizeDesideIfItIsPhoneStanding();

    $body
        .on("slid.bs.carousel", "#k-gallery-slider", main.nextPrevBtnClicked)
        .on('click', '.k-nav-bar > li:not(.active)', handleNavClicke)
    ;

    $(window).on('resize', main.nextPrevBtnClicked);
}();
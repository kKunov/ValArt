!function () {
    var $body = $("body"),
        galleryLoaded = false;

    function galClicked() {
        var $indexatorContainer = $(".k-indexator-container"),
            $imagesContainer = $(".k-images-container"),
            classActive = "\" class=\"active\"",
            i;
        
        if (galleryLoaded) {
            return;
        }

        $indexatorContainer.empty();
        $imagesContainer.empty();

        jQuery.get('galleries/galleriNamesInFolder', function(result) {
            for (i = 0; i < result.length; i++){
                $indexatorContainer.append(
                    "<li data-target=\"#k-gallery-slider\" data-slide-to=\"" + i + (i === 0 ? classActive : "") + "\"></li>"
                );

                $imagesContainer.append(
                    "<div class=\"item" + (i === 0 ? " active" : "") + "\">" + 
                    "<img src=\"images/gal/" + result[i] + "\"></div>"
                );
            }

            galleryLoaded = true;
            setTimeout(nextPrevBtnClicked, 100);
        });
    }
    
    function nextPrevBtnClicked(e) {
        var $slider = $('#k-gallery-slider'),
            $img = $slider.find(".active > img"),
            imgHeight = $img.height(),
            imgWidth = $img.width(),
            newImgWidth;

        if (!$('.k-nav-bar > .active').hasClass('k-galleries-navbar')){
            return;
        }

        if (imgHeight > imgWidth) {
            $img.attr("style", "max-width: none; max-height: 61vh;");
            newImgWidth = $img.width();
            $slider.attr("style", "max-width: " + newImgWidth + "px;");
            $slider.closest(".k-single-gal").attr("style", "left: 56vw;");
        }
        else {
            $slider.removeAttr("style");
            $img.removeAttr("style");
            $slider.closest(".k-single-gal").removeAttr("style");
        }
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

    $body
        .on("slid.bs.carousel", "#k-gallery-slider", nextPrevBtnClicked)
        .on('click', '.k-nav-bar > li:not(.active)', handleNavClicke)
    ;

    $(window).on('resize', nextPrevBtnClicked);
}();
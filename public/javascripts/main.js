!function () {
    function homeBtnClicked() {
        $(".k-page-views").attr("style" ,"display:none;");
        $(".homeInfo").removeAttr("style");
    }

    function galClicked(e) {
        var $indexatorContainer = $(".k-indexator-container"),
            $imagesContainer = $(".k-images-container"),
            classActive = "\" class=\"active\"",
            i;

        $(".k-page-views").attr("style" ,"display:none;");
        $(".k-single-gal").removeAttr("style");
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

            nextPrevBtnClicked();
        });
    }
    
    function nextPrevBtnClicked(e) {
        var $slider = $('#k-gallery-slider'),
            $img = $slider.find(".active > img"),
            imgHeight = $img.height(),
            imgWidth = $img.width(),
            newImgWidth;

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

    $("body").on("click", ".k-galleries-navbar", galClicked);
    $("body").on("click", ".k-home-navbar", homeBtnClicked);
    $("body").on("slid.bs.carousel", "#k-gallery-slider", nextPrevBtnClicked);
    $(window).on('resize', nextPrevBtnClicked);
}();
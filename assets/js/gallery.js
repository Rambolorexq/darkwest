function Gallery() {

    let galleryImagesCount = 9;
    let galleryImagesRow = 3;
    let galleryImagesColumn = 3;
    let galleryWidth = 57.7;
    let galleryGridMargin = 2.1;
    let imagesCount =  $('.galleryListInnerMain .galleryImageContainer').length;
    let galleryPages = Math.ceil(imagesCount / galleryImagesCount);
    let galleryCurrentPage = 0;
    let isGalleryAnimated = false;
    let imageWidth = 17.8;
    let imageHeight = 11.45;
    
    if($(window).width() < 1280) {
        galleryImagesCount = 6;
        galleryImagesRow = 2;
        galleryImagesColumn = 3;
        galleryImagesSqrt = Math.sqrt(galleryImagesCount);
        galleryWidth = 89.9;
        galleryGridMargin = 2.5;
        imagesCount =  $('.galleryListInnerMain .galleryImageContainer').length;
        galleryPages = Math.ceil(imagesCount / galleryImagesCount);
        galleryCurrentPage = 0;
        isGalleryAnimated = false;
        imageWidth = 43.7;
        imageHeight = 28;
    }
    if($(window).width() < 768) {
        galleryImagesCount = 6;
        galleryImagesRow = 2;
        galleryImagesColumn = 3;
        galleryImagesSqrt = Math.sqrt(galleryImagesCount);
        galleryWidth = 89.9;
        galleryGridMargin = 2.5;
        imagesCount =  $('.galleryListInnerMain .galleryImageContainer').length;
        galleryPages = Math.ceil(imagesCount / galleryImagesCount);
        galleryCurrentPage = 0;
        isGalleryAnimated = false;
        imageWidth = 43.7;
        imageHeight = 28;
    }
    

    this.generateGallery = function(filter = "") {
        $('.galleryListInnerPre').empty();
        $('.galleryListInnerPost').empty();
        $('.galleryListInnerMain .galleryImageContainer').css({display: 'none'})

        imagesCount =  $('.galleryListInnerMain .galleryImageContainer' + (filter != '' ? '[data-imagetype="' + filter + '"]' : '')).length;
        galleryPages = Math.ceil(imagesCount / galleryImagesCount);
        galleryCurrentPage = 0;
        $('.galleryListInnerPre').css({left: -(galleryWidth + galleryGridMargin) + 'vw'});
        $('.galleryListInnerPost').css({left: (galleryWidth + galleryGridMargin) * galleryPages + 'vw'});
        $('.galleryListInner').css({left: (galleryWidth + galleryGridMargin) * -galleryCurrentPage + 'vw'})

        $('.galleryListInnerMain .galleryImageContainer' + (filter != '' ? '[data-imagetype="' + filter + '"]' : '')).each(function(index) {
            $(this).css({
                display: 'block',
                top: (Math.floor(index / galleryImagesRow) % galleryImagesColumn) * (imageHeight + galleryGridMargin) + 'vw',
                left: Math.floor(index / galleryImagesCount) * (galleryWidth + galleryGridMargin) + (index % galleryImagesRow) * (imageWidth + galleryGridMargin) + 'vw'
            });
            if(index < galleryImagesCount) {
                $(this)
                .clone()                
                .css({
                    top: (Math.floor(index / galleryImagesRow) % galleryImagesColumn) * (imageHeight + galleryGridMargin) + 'vw',
                    left: (index % galleryImagesRow) * (imageWidth + galleryGridMargin) + 'vw'
                })
                .appendTo('.galleryListInnerPost');
            }
            if(index >= (galleryPages - 1) * galleryImagesCount) {
                $(this)
                .clone()
                .css({
                    top: (Math.floor(index / galleryImagesRow) % galleryImagesColumn) * (imageHeight + galleryGridMargin) + 'vw',
                    left: (index % galleryImagesRow) * (imageWidth + galleryGridMargin) + 'vw'
                })
                .appendTo('.galleryListInnerPre');
            }
        });
    }
    this.generateGallery();

    $('.galleryLeft').click(function() {
        if(!isGalleryAnimated) {
            galleryCurrentPage--;
            moveGallery();
        }
    });
    $('.galleryRight').click(function() {
        if(!isGalleryAnimated) {
            galleryCurrentPage++;
            moveGallery();
        }
    });

    function moveGallery() {
        isGalleryAnimated = true;
        $('.galleryListInner').animate({
            left: (galleryWidth + galleryGridMargin) * -galleryCurrentPage + 'vw'
        }, 200, function() {
            if(galleryCurrentPage == galleryPages) {
                galleryCurrentPage = 0;
                $('.galleryListInner').css({left: (galleryWidth + galleryGridMargin) * -galleryCurrentPage + 'vw'})
            }
            else if(galleryCurrentPage == -1) {
                galleryCurrentPage = galleryPages - 1;
                $('.galleryListInner').css({left: (galleryWidth + galleryGridMargin) * -galleryCurrentPage + 'vw'})
            };
            isGalleryAnimated = false;
        });
    }

    $('.galleryFilter').click((e) => {
        $('.galleryFilter').removeClass('galleryFilter-active');
        $(e.target).addClass('galleryFilter-active');
        this.generateGallery((e.target).getAttribute('data-galleryfilter'));
    })
}
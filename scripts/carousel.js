window.addEventListener('load', function() {
    var carousels = document.getElementsByClassName('carousel')

    // 캐러셀 이벤트를 등록하는 로직
    for (var i =0; i < carousels.length; i++) {
        addEventToCarousel(carousels[i]);
    }
});

function addEventToCarousel(carouselElem) {
    var ulElem = carouselElem.querySelector('ul');
    var liElems = ulElem.querySelectorAll('li');

    // 너비 값 조정
    var liWidth = liElems[0].clientWidth;
    var adjustedWidth = liElems.length * liWidth;
    ulElem.style.width = adjustedWidth + 'px';

    // 슬라이드 버튼 이벤트 등록
    var slideButtons = carouselElem.querySelectorAll('.slide');
    for(var i = 0; i < slideButtons.length; i++) {
        slideButtons[i].addEventListener('click', createListenerSlide(carouselElem));
    }
}

//클로져 함수
function createListenerSlide(carouselElem) {
    
    return function(event) {
        var clickedButton = event.currentTarget;

        // 값 가져오기
        var liElems = carouselElem.querySelectorAll('li');
        var liCount = liElems.length;
        var currentIndex = carouselElem.attributes.data.value;

        // 슬라이드 버튼 체크
        if(clickedButton.className.includes('right') && currentIndex < liCount - 1) {
            currentIndex ++;
            scrollDiv(carouselElem, currentIndex);
        } else if(clickedButton.className.includes('left') && currentIndex > 0) {
            currentIndex --;
            scrollDiv(carouselElem, currentIndex);
        }
        // 인디케이터 업데이트
        updateIndicator(carouselElem, currentIndex);

        //슬라이드 버튼 보여줌 여부 업데이트
        updateSlideButtonVisible(carouselElem, currentIndex, liCount);

        //새롭게 보여지는 이미지 인덱스 값을 현재 data 값으로 업데이트
        carouselElem.attributes.data.value = currentIndex;
    }
}


function scrollDiv(carouselElem, nextIndex) {
    var scrollable = carouselElem.querySelector('div');
    var liWidth = scrollable.clientWidth;
    var newLeft = liWidth * nextIndex;

    scrollable.scrollTo({left: newLeft, behavior: 'smooth'});
}

function updateIndicator(carouselElem, currentIndex) {
    var indicators = carouselElem.querySelectorAll('footer > div');
    for(var i = 0; i < indicators.length; i++) {
        if(currentIndex == i) {
            indicators[i].className = 'active'
        } else {
            indicators[i].className = '';
        }
    }
}

function updateSlideButtonVisible(carouselElem, currentIndex, liCount) {
    
    var left = carouselElem.querySelector('.slide-left');
    var right = carouselElem.querySelector('.slide-right');

    if(currentIndex > 0) {
        left.style.display = 'block';
    } else {
        left.style.display = 'none';
    }

    if (currentIndex < liCount - 1) {
        right.style.display = 'block';
    } else {
        right.style.display = 'none';
    }
}

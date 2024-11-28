function remove_hide(i){
    $(".fullsection.full"+i).removeClass("hide");
}
var change_speed = 750;
var release_times, times;
// 사이드 퀵버튼 클릭 이동
function moving_sections(gnbindex,length){ //화면전환 중에 다른 화면 전환 불가
    $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick > ul > li").outerHeight(true) * gnbindex)}, change_speed);
    $(".quick > ul > li").removeClass("on").eq(gnbindex).addClass("on");
    $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");

    $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
    $(".pagination b").text(gnbindex+1);
    remove_hide(gnbindex+1);

    if(gnbindex === 1 || gnbindex === 4) {
        document.body.classList.add("black");
        setTimeout(() => {
            document.querySelector(".logo > img").setAttribute("src", "img/b_and_o_w.svg");
        }, change_speed - 100);
    } else {
        document.body.classList.remove("black");
        setTimeout(() => {
            document.querySelector(".logo > img").setAttribute("src", "img/b_and_o_b.svg");
        }, change_speed - 100);
    }

    const fullsection = document.querySelectorAll(".fullsection");
    const pageTextLeft = document.querySelector(".page_text_left")
    fullsection.forEach((ele,idx) => {
        if(idx === gnbindex) {
            setTimeout(() => {
                pageTextLeft.innerHTML = ele.dataset.text;
            }, change_speed - 100);
        } 
    });
}
function quickClick(){
    $(".quick > ul > li, ul.nav li").click(function(){
        var gnbindex = $(this).index();
        var length = 0;
        for(var i=1; i<(gnbindex+1); i++){
            length+=$(".full"+i).height();
        }
        //if($("body").find("#fullpage:animated").length >= 1) return false;
        moving_sections(gnbindex,length);
        return false;
    });
}
function fullset(){
    var pageindex = $("#fullpage > .fullsection").length; //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
    $(".pagination span").text(pageindex);
    for(var i=1;i<=pageindex;i++){
        $("#fullpage > .quick > ul").append("<li></li>"); //왼쪽 도트 생성
    }
    const fullSubSet = () => {
        const fullSection = document.querySelectorAll(".fullsection");
        fullSection.forEach((ele, idx) => {
            const eleChild = Array.from(ele.children);
            for(let child of eleChild) {
                if(child.classList.contains("full_sub_con")) {
                    let innnerUl = "<ul class='inner_dots'>"
                    for(let i = 0; i < child.children.length; i++) {
                        innnerUl += "<li></li>"
                    }
                    innnerUl += "</ul>"
                    document.querySelectorAll(".quick > ul > li")[idx].innerHTML = innnerUl;
                }
            }
        });
    }
    fullSubSet();
    $(".quick").css({marginTop: $(".quick").height()/2});
    $("#fullpage .quick > ul > li:first-child, #header > ul.nav > li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게
    function moving_page(){
        clearTimeout(times);
        times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
        //event.preventDefault();
        if(!$("body").hasClass("locked")){
            $("body").addClass("locked");
            var page = $(".quick > ul > li.on");
            //console.log(page.index()+1);  // 현재 on 되어있는 페이지 번호
            if($("body").find("#fullpage:animated").length >= 1){
                return false;
            }
            
            if (event.wheelDelta > 0 || event.detail < 0) {//마우스 휠을 위로
                var before = page.index();
                var pagelength=0;
                for(var i=1; i<(before); i++){
                    pagelength += $(".full"+i).height();
                }
                if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                    page = page.index()-1;
                    moving_sections(page, pagelength);
                }else{
                    // alert("첫번째 섹션 입니다.");
                }	
            }else{ // 마우스 휠을 아래로	
                var nextPage = parseInt(page.index()+1); //다음페이지번호
                var lastPageNum = parseInt($(".quick > ul > li").length); //마지막 페이지번호
                //현재페이지번호 <= (마지막 페이지 번호 - 1)
                if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
                    var pagelength=0;
                    for(var i = 1; i<(nextPage+1); i++){ 
                        //총 페이지 길이 구하기
                        //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                        pagelength += $(".full"+i).height();
                    }
                    moving_sections(nextPage, pagelength);
                }else{ // 현재 마지막 페이지 일때는
                    // alert("마지막 섹션 입니다!");
                }
            }
        }else{
            return false;
        }
        clearTimeout(release_times);
        release_times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
    }
    
    window.addEventListener("mousewheel", moving_page, {passive: false});
    window.addEventListener("DOMMouseScroll", moving_page, {passive: false});    
    
    $(window).resize(function(){ 
        //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
        var resizeindex = $(".quick > ul > li.on").index()+1;
        var pagelength = 0;
        for(var i = 1; i<resizeindex; i++){ 
            //총 페이지 길이 구하기
            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
            pagelength += $(".full"+i).height();
        }
        $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
        full_sub_resize();
    });
}
var prnts_w, prnts_h;
function full_sub_resize(){
    $(".full_sub").each(function(){
        prnts_w = $(this).parents(".fullsection").width();
        prnts_h = $(this).parents(".fullsection").height();
        $(this).css({width: prnts_w, height:prnts_h});
    });
    $(".full_sub_con").each(function(){
        $(this).width(prnts_w * $(this).find(".full_sub").length);
    });
}
function full_sub_sizing(){
    full_sub_resize();
    $(".quick ul.inner_dots").each(function(){
        $(this).find("li").eq(0).addClass("selected");
    });
    $(".btn_left, .btn_right").each(function(){
        var sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
        if(sub_counter == 1){
            $(this).parent(".fullsection").find(".btn_left").addClass("disable");
        }
        $(this).click(function(){
            sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
            var move_w = prnts_w;
            if($(this).hasClass("btn_left")){
                if(sub_counter > 1){
                    sub_counter -=1;
                }else{
                    // alert("첫 페이지 입니다");
                }
            }else{
                if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){
                    sub_counter +=1;
                }else{
                    // alert("막 페이지 입니다");
                }
            }
            if(sub_counter == 1){
                $(this).parent(".fullsection").find(".btn_left").addClass("disable");
                $(this).parent(".fullsection").find(".btn_right").removeClass("disable");
            }else if(sub_counter == $(this).parents(".fullsection").find(".full_sub").length){
                $(this).parent(".fullsection").find(".btn_left").removeClass("disable");
                $(this).parent(".fullsection").find(".btn_right").addClass("disable");
            }else{
                $(this).parent(".fullsection").find(".btn_right, .btn_left").removeClass("disable");
            }
            $(".quick li.on ul.inner_dots").find("li").removeClass("selected");
            $(".quick li.on ul.inner_dots").find("li").eq(sub_counter-1).addClass("selected");
            $(".quick li.on ul.inner_dots").css({transform:"translateX(-"+((sub_counter - 1)*24)+"px)"});
            move_w = move_w * (sub_counter-1) * -1;
            $(this).parent(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter-1).removeClass("hide");
            
        });
    });
    $(".quick ul.inner_dots").each(function(){
        $(this).find("li").each(function(){
            $(this).click(function(){
                var section_num = $(this).parent("ul.inner_dots").parent().index();
                var sub_page = $(this).index();
                $(this).parent().find("li").removeClass("selected");
                $(this).addClass("selected");
                $(this).parent("ul.inner_dots").css({transform:"translateX(-"+((sub_page)*24)+"px)"});
                sub_counter = sub_page + 1;
                var move_w = prnts_w;
                move_w = move_w * sub_page * -1;
                if(sub_counter == 1){
                    $(".fullsection").eq(section_num).find(".btn_left").addClass("disable");
                    $(".fullsection").eq(section_num).find(".btn_right").removeClass("disable");
                }else if(sub_counter == $(".fullsection").eq(section_num).find(".full_sub").length){
                    $(".fullsection").eq(section_num).find(".btn_left").removeClass("disable");
                    $(".fullsection").eq(section_num).find(".btn_right").addClass("disable");
                }else{
                    $(".fullsection").eq(section_num).find(".btn_right, .btn_left").removeClass("disable");
                }
                $(".fullsection").eq(section_num).find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter-1).removeClass("hide");
            });
        });
    });
}
$(function(){
    fullset();
    quickClick();
    full_sub_sizing();
});
$(window).load(function(){
    $("body").removeClass("locked");
});
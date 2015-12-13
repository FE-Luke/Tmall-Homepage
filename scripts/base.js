/**
 * Created by Zhichao Liu on 11/4/2015.
 */


$(document).ready(
    function(){

        document.onselectstart = function(){return false};

        jQuery.fx.interval = 10; //Set FPS to 10ms/Frame

        /*topbar元素显示与隐藏*/
        $('.topbar-hidd-btn').hover(
            function () {$(this).find('.hidd-block').show();}, function () {$(this).find('.hidd-block').hide();}
        );

        /*图片微动效果*/
        $('.animLeft').hover(
            function(){
                $(this).stop();
                $(this).animate({marginLeft:'-10px'},300,'swing')
            },
            function(){
                $(this).stop();
                $(this).animate({marginLeft:'0px'},300,'swing')}
        );

        /*楼层小轮播*/
        var now = 1;
        $('.brand-switch-left').click(
            function(){
                var brandList = $(this).parent().find('.brandlist');
                var mL = parseInt($(this).parent().find('.brandlist').css('marginLeft'));
                brandList.stop(true,true);
                if(now>1){
                    brandList.animate({marginLeft:mL+110},500,'swing');
                    now--;
                }else{
                    brandList.animate({marginLeft:-220},500,'swing');
                    now=3;
                }

            }
        );
        $('.brand-switch-right').click(
            function(){
                var brandList = $(this).parent().find('.brandlist');
                brandList.stop(true,true);
                if(now<3){
                    brandList.animate({marginLeft:now*(-110)},500,'swing');
                    now++;
                }else{
                    brandList.animate({marginLeft:0},500,'swing');
                    now=1;
                }
            }
        );

        var lunbo2 = function(){
            var brandList = $('.brand-switch-left').parent().find('.brandlist');
            if(now<3){
                brandList.animate({marginLeft:now*(-110)},500,'swing');
                now++;
            }else{
                brandList.animate({marginLeft:0},500,'swing');
                now=1;
            }
        };
        var tt2 = setInterval(lunbo2,5000);

        /*滚动条事件*/
        $(document).on('scroll',function(){
            var scrollTop = $(window).scrollTop();
            if(scrollTop>=($($('.floor')[0]).offset().top-300)){
                $('.left-sidebar').stop();
                $('.fixed-topbar').stop();
                $('.gotop').stop();
                $('.left-sidebar').fadeIn();
                $('.fixed-topbar').fadeIn();
                $('.gotop').fadeIn();
            }else{
                $('.left-sidebar').stop();
                $('.fixed-topbar').stop();
                $('.gotop').stop();
                $('.left-sidebar').fadeOut();
                $('.fixed-topbar').fadeOut();
                $('.gotop').fadeOut();
            }

            var newScrollTop = (scrollTop+$(window).height()/2);
            if(newScrollTop>=$($('.floor')[0]).offset().top && newScrollTop<=$($('.floor')[1]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[0]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[1]).offset().top && newScrollTop<=$($('.floor')[2]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[1]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[2]).offset().top && newScrollTop<=$($('.floor')[3]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[2]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[3]).offset().top && newScrollTop<=$($('.floor')[4]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[3]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[4]).offset().top && newScrollTop<=$($('.floor')[5]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[4]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[5]).offset().top && newScrollTop<=$($('.floor')[6]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[5]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[6]).offset().top && newScrollTop<=$($('.floor')[7]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[6]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[7]).offset().top && newScrollTop<=$($('.floor')[8]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[7]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[8]).offset().top && newScrollTop<=$($('.floor')[9]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[8]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[9]).offset().top && newScrollTop<=$($('.floor')[10]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[9]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[10]).offset().top && newScrollTop<=$($('.floor')[11]).offset().top){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[10]).addClass('sel');
            }else if(newScrollTop>=$($('.floor')[11]).offset().top && newScrollTop<=$($('.floor')[11]).offset().top + $($('.floor')[11]).height()){
                $('.left-sidebar li').removeClass('sel');
                $($('.left-sidebar li')[11]).addClass('sel');
            }else{
                $('.left-sidebar li').removeClass('sel');
            }
        });

        /*品牌选项卡*/
        $('.brand-title .pull-left li').click(function(){
            $('.brand-title .pull-left li').removeClass('select');
            $(this).addClass('select');
            $('.brand-show .brand').css('display','none');
            $('.brand-show .brand').removeClass('show');
            $($('.brand-show .brand')[$(this).index()]).css('display','block');
            $($('.brand-show .brand')[$(this).index()]).addClass('show');
        });

        /*品牌-换一批*/
        $('.reload').click(function(){
            var imgN = $('.brand-show').find('.show').index()+1;
            var dict = {};
            var picTable = [];
            while(picTable.length<24){
                var random = Math.floor(Math.random()*24)+1;
                if(!dict[random]){
                    dict[random] = true;
                    picTable.push(random);
                }else{
                    continue;
                }
            }
            $('.brand-show').find('.show').find('li').each(function(index){
                $(this).find('img').attr('src','./images/brand/brand'+imgN+'-'+picTable[index]+'.jpg');
            })
        });

        /*楼层跳转*/
        $('.left-sidebar li').each(function(i){
            $(this).data('index',i);
        });
        $('.left-sidebar li').click(function(){
            var i = $(this).data('index');
            var newtop = $( $('.floor')[i] ).offset().top - 250;
            $({top: $(window).scrollTop()}).animate({top: newtop}, {duration: 500, step: function() {$(window).scrollTop(this.top);}});
        });

        /*回到顶部*/
        $('.gotop').click(function(){
            $({top: $(window).scrollTop()}).animate({top: 0}, {duration: 500, step: function() {$(window).scrollTop(this.top);}});
        });

        /*右侧边栏效果*/
        $('.right-sidebar li').hover(function(){
            $('.right-sidebar li').stop();
            $(this).find('.subtag').show(0,function(){
                $(this).animate({right:28,opacity:1},300);
            });
        },function(){
            $('.right-sidebar li').stop();
            $(this).find('.subtag').css({right:70,opacity:0}).hide(0);
        });


        /*banner轮播*/
        var colorTable = ['#0166ff','#f6f5f3','#76dce8','#dfdfdf','#5940a8','#0f57c6'];
        var index = 0;
        var lunbo = function(i){
            if(i!=undefined){index = i;}
            $('.banner1 .banner-pic').find('img').css({transform:'scale(1.05)'});
            $($('.banner1 .banner-pic')).find('.banner-bg').css({transform:'scale(0.7)'});
            $('.banner1 .banner-pic').fadeOut(1000);
            $('.banner1 .bannerDot li').removeClass('select');
            $($('.banner1 .bannerDot li')[index]).addClass('select');
            $($('.banner1 .banner-pic')[index]).fadeIn(1000);
            $($('.banner1 .banner-pic')[index]).find('img').css({transform:'scale(1.0)'});
            $($('.banner1 .banner-pic')[index]).find('.banner-bg').css({transform:'scale(0.8)'});
            $('.banner1').css('backgroundColor',colorTable[index]);
            if(index<$('.banner1 .banner-pic').length-1){index++;}else{index = 0;}
        };
        var tt = setInterval(lunbo,8000);
        $('.banner1 .bannerDot li').click(function(){
            clearInterval(tt);
            $('.banner1 .bannerDot li').removeClass('select');
            $(this).addClass('select');
            lunbo($(this).index());
            tt = setInterval(lunbo,8000);
        });
        lunbo();


        /*banner分类*/
        $('.cata-list .li-items').hover(function(){
            if($(this).hasClass('bannerLayer')){clearInterval(tt);tt = setInterval(lunbo,8000)}else{clearInterval(tt);}
            $(this).find('.sublist').show();
            $('.banner-c').hide();
            $($('.banner-c')[$(this).index()]).show();
        },function(){
            $(this).find('.sublist').hide();
        });

    }
);

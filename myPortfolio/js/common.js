// toTopの処理
$(function () {
	var topBtn = $(".toTop");
	topBtn.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
		var scrollHeight = $(document).height(); //ページ全体の高さ
		var scrollPos = $(window).height() + $(window).scrollTop(); //現在地
		var footerHeight = $("footer").innerHeight(); //フッタの高さ
		if (scrollHeight - scrollPos <= footerHeight) {
			//ドキュメントの高さと現在地の差がfooterの高さ以下になったら
			topBtn.css({
				position: "absolute",
				// bottom: footerHeight + 60 + "px",
			});
		} else {
			topBtn.css({
				position: "fixed",
				bottom: "20px",
			});
		}
	});
	topBtn.click(function () {
		$("body,html").animate(
			{
				scrollTop: 0,
			},
			500
		);
		return false;
	});
});

// fadeIn fadeOutの処理
$(function () {
	$(window).on("load scroll resize", function () {
		$(".fadeIn").each(function () {
			// HTMLのfadeInさせたいクラスに[fadeIn fadeD]など2つクラス名つける
			var imgPosition = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > imgPosition - windowHeight + windowHeight / 5) {
				$(this).addClass("active");
				// fadeInクラスに activeクラスを付与
				// CSSで activeクラス と下記fade~クラスに処理をあてる
				// 例 fadeU fadeR fadeD fadeL
			}
		});
	});
});

// aタグスムーズスクロール
$(function () {
	$('a[href^="#"]').click(function () {
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? "html" : href);
		var position = target.offset().top;
		$("html, body").animate({ scrollTop: position }, speed, "swing");
		return false;
	});
});

//ハンバーガーメニュー
$(function () {
	$(".btn-trigger").on("click", function () {
		//btn-trigger をクリックしたとき
		$(this).toggleClass("btn__active");
		// toggleClass → addClass と removeClass を切り替える
		$("body").toggleClass("hidden__active");
		// body に hidden__activeを追加する
		if ($("body").hasClass("hidden__active")) {
			$("body").css({
				overflow: "hidden",
			});
		} else {
			$("body").css({
				overflow: "initial",
			});
		}
		if ($(this).hasClass("btn__active")) {
			//btn__active持ってたら
			$("nav").css({
				visibility: "visible",
				opacity: 1,
				//navに追加する
			});
		} else {
			$("nav").css({
				//btn__active持ってなかったら
				visibility: "hidden",
				opacity: 0,
				//navに追加する
			});
		}
		return false;
	});
});

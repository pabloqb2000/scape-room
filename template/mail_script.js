
$(document).on("click","#logout", function () {
    window.location.href = "index.html";
});

$(document).on("click",".mail-icon", function () {
    var list = $(this).attr("title");
    if(list == shownList) return;
    $(".mail-icon").removeClass("fa-2xl primary-text");
    $(".mail-list").css("height", "0px");
    $(this).addClass("fa-2xl primary-text");
    $("#"+shownList)
        .css("height", heights[shownList])
        .animate({height: "0px"}, 250,
        () => {
            $("#"+list)
                .css("height", "0px")
                .animate({height: heights[list]}, 250);
        }
    );
    shownList = list;
});

$(document).on("click", ".mail", function() {
    $('#email-title').text($(this).attr("title"));
    $('#email-content').text($(this).attr("content"));
    $('#email-sender').text($(this).attr("sender"));

    $('#mail-modal').modal();
});

var heights = {};
var shownList = "inbox";
$(document).ready(function(){
    let lists = ["sent", "favourites", "inbox", "drafts", "trash"];
    lists.forEach(l => {
        heights[l] = $("#"+l).css("height");
        if(l != "inbox")
            $("#"+l).css("height", "0px");
    });
});

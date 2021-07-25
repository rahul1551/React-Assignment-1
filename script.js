function search_boxs() {
  let input = document.getElementById("search-box").value;
  console.log(input);
  input = input.toLowerCase();
  let x = document.getElementsByClassName("data-row");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "";
    }
  }
}

$(document).ready(function () {
  $("form").click((e) => {
    e.preventDefault();
  });
  $.get(
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
    function (response) {
      console.log(response);
      let i = 0;
      for (var x of response) {
        var data_row = $("<tr>")
          .addClass("data-row")
          .prop({
            id: "details" + i,
          });
        $("tbody").append(data_row);

        let length = Object.keys(x).length - 2;
        let j = 1;

        for (let y in x) {
          if (length) {
            const column = $("<td>").addClass(`columns`).html(x[y]);
            $(data_row).append(column);
            length--;
            j++;
          }
        }

        i++;
      }

      for (let p = 0; p < response.length; p++) {
        $("#details" + p).click(function (e) {
          $("#info-content").css("display", "inline-block");
          $(".data-row").removeClass("active");
          if (p + 1) {
            $("#details" + p).addClass("active");
          }
          updataDetails(p);
        });
      }

      function updataDetails(id) {
        $(".user").html(response[id].firstName + " " + response[id].lastName);
        $(".address").html(response[id].address.streetAddress);
        $(".city").html(response[id].address.city);
        $(".state").html(response[id].address.state);
        $(".zip").html(response[id].address.zip);
        $("textarea").html(response[id].description);
      }
    }
  );
});

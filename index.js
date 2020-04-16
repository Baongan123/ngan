var dashboard = dashboard || {};

dashboard.drawTable = function () {
    $.ajax({
        url: "https://ngandatabase.herokuapp.com/products",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#show').empty();
            let id = 1;
            $.each(data, function (i, v) {
                $('#show').append(
                    "<div class='col-md-4 col-sm-6 portfolio-item'>" +
                    "<a class='portfolio-link' data-toggle='modal' href='#portfolioModal'>" +
                    "<div class='portfolio-hover'>" +
                    "<div class='portfolio-hover-content'>" +
                    "<i  class='fas fa-plus fa-3x' onclick='dashboard.Modal(" + v.id + ")'></i >" +
                    "</div>" +
                    "</div>" +
                    "<img class='img-fluid' src='" + v.productImage + "'>" +
                    "</a>" +
                    "<div class='portfolio-caption'>" +
                    "<h4>" + v.productName + "</h4>" +
                    "<p class='text-muted'>" + v.color + "</p>" +
                    "</div>" +
                    "</div>"
                );
            })
        }
    });
}


dashboard.check = function () {
    let tendnkh = $('#tendnkh').val();
    let pass = $('#pass').val();
    let isLogged = false;
    $.ajax({
        url: "https://ngandatabase.herokuapp.com/khachhang",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                if (v.taotendnkh == tendnkh && v.taopass == pass) {
                    isLogged = true;

                    $("#modaldangnhap").modal('hide')
                    $("#modalgiohang").modal('show');

                }
            });
            console.log(isLogged)
            if (isLogged==false) {
                $('#dangnhapsai').removeClass('d-none');
            }
        }
    });
}
dashboard.dangky = function () {
    if ($("#formtaotk").valid()) {
        var khm = {};
        khm.hoten = $('#hoten').val();
        khm.taotendnkh = $('#taotendnkh').val();
        khm.taopass = $('#taopass').val();
        khm.sdtkh = $('#sdtkh').val();
        khm.dckh = $('#dckh').val();
        $.ajax({
            url: "https://ngandatabase.herokuapp.com/khachhang",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(khm), //chuyển addoject thành chuỗi
            success: function (data) {
                $("#modaldangky").modal('hide');
                $("#modaldangnhap").modal('show');
            }
        })
    };



}
dashboard.dangxuat = function () {
    bootbox.confirm({
        title: "Đăng xuất",
        message: "Bạn có chắc chắn muốn đăng xuất không?",
        buttons: {
            confirm: {
                label: '<i class="fa fa-check"></i> Có'
            },
            cancel: {
                label: '<i class="fa fa-times"></i> Không'
            }

        },
        callback: function (result) {
            if (result) {
                $('#kiemtra').val("0");
                $("#modalgiohang").modal('hide');
            }

        }
    });
}
dashboard.resetformdn = function () {
    document.getElementById("dangnhapsai").classList.add("d-none");
    $('#tendnkh').val('');
    $('#pass').val('');
}
dashboard.buyproduct = function () {
    $("#showsp").modal('hide');
    bootbox.confirm({
        title: "Mua Hàng",
        message: "Bạn có chắc chắn muốn mua hàng không?",
        buttons: {
            confirm: {
                label: '<i class="fa fa-check"></i> Có'
            },
            cancel: {
                label: '<i class="fa fa-times"></i> Không'
            }

        },
        callback: function (result) {
            if (result) {
                $("#modalmuahang").modal('show');
                ssp = $("#sosanpham").val();
                ssp++;
                $("#sosanpham").val(ssp);
                $("#cart").find('#sosanpham').text(ssp);
            }
        }
    });

}
dashboard.showgiohang = function () {
    if ($("#kiemtra").val() == 0) {
        dashboard.resetformdn();
        $("#modaldangnhap").modal('show');
    }
    else { $("#modalgiohang").modal('show'); }

}

dashboard.taotaikhoan = function () {
    $("#modaldangnhap").modal('hide');
    $("#modaldangky").modal('show');
}
//dashboard.taikhoan() = function(){
//  $("#modaldangky").modal('hide');
//  $("#modaldangnhap").modal('show');
//}
dashboard.Modal = function (id) {
    $.ajax({
        url: "https://ngandatabase.herokuapp.com/products/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            document.getElementById("img").setAttribute('src', data.productImage);
            $('#showsp').find('#name').text(data.productName);
            $('#showsp').find('#color').text(data.color);
            $('#showsp').find('#price').text(data.price);
            $('#showsp').find('#mft').text(data.manufactory);
            $('#showsp').find('#dct').text(data.description);
            $('#showsp').modal('show');

        }
    });

}
dashboard.init = function () {
    dashboard.drawTable();
};
$(document).ready(function () {
    dashboard.init();
});
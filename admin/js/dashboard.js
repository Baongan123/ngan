var dashboard = dashboard || { }

dashboard.drawTable = function(){
    $.ajax({
        url: "https://ngandatabase.herokuapp.com/products",
        method: "GET",
        dataType : "json",
        success : function(data){
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function(i, v){
                $('#tbProducts tbody').append(
                    "<tr>"+
                        "<td>" + (id++) +"</td>"+ //data[i].id
                        "<td>"+ v.productName +"</td>"+
                        "<td><img src='../"+ v.productImage +"' width='120px' height='150px'></td>"+
                        "<td>" + v.color +"</td>"+
                        "<td>" + v.price +"</td>"+
                        "<td>" + v.manufactory + "</td>"+
                        "<td>" + v.description + "</td>"+
                        "<td>"+
                            "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");' ><i class='fa fa-edit mr-3'> Sửa</i></a> "+
                            "<a href='javascript:;' onclick='dashboard.remove("+ v.id +");' ><i class='fa fa-trash'> Xóa</i></a>"+
                        "</td>"+
                    "</tr>"
                );
            })
        }
    });
}

dashboard.openModal = function(){
    dashboard.restForm(); 
    $('#addEditModal').modal('show');
}

dashboard.remove = function(id){
    bootbox.confirm({
        title: "Remove Product?",
        message: "Do you want to remove this product?",
        buttons: {
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            },
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            }
            
          
        },
        callback: function (result) {
            if(result){
                $.ajax({
                    url : "https://ngandatabase.herokuapp.com/products/" + id,
                    method : "DELETE", //"POST"
                    dataType:'json',
                    success : function(data){
                        dashboard.drawTable();
                        bootbox.alert("Product has been deleted successfully");
                    }
                });
            }
        }
    });
}

dashboard.save = function(){
    if($('#formAddEditProduct').valid()){
        if($('#productId').val() == 0){ //Add new product
            var addObj = {};
        addObj.productName = $('#ProductName').val();
        addObj.productImage = $('#ProductImage').val();
        addObj.price = $('#Price').val();
        addObj.color = $('#Color').val();
        addObj.manufactory = $('#Manufactory').val(), //$( "#Manufactory option:selected" ).text(); ;
        addObj.description = $('#Description').val();
        
        $.ajax({
            url : "https://ngandatabase.herokuapp.com/products",
            method : "POST",
            dataType: "json",
            contentType: "application/json",
            data : JSON.stringify(addObj), //chuyển addoject thành chuỗi
            success : function(data){
                $('#addEditModal').modal('hide');
                dashboard.drawTable();
                bootbox.alert("Product has been added successfully");

            }
        })
        }
        else{ //update product
            var updateObj = {};
            updateObj.productName = $('#ProductName').val();
            updateObj.productImage = $('#ProductImage').val();
            updateObj.color = $('#Color').val();
            updateObj.price = $('#Price').val();
            updateObj.manufactory = $('#Manufactory').val(),
            updateObj.description = $('#Description').val();
            updateObj.id = $('#productId').val();
            
            $.ajax({
                url : "https://ngandatabase.herokuapp.com/products/" + updateObj.id,
                method : "PUT",
                dataType: "json",
                contentType: "application/json",
                data : JSON.stringify(updateObj),
                success : function(data){
                    $('#addEditModal').modal('hide');
                    dashboard.drawTable();
                    bootbox.alert("Product has been updated successfully");
    
                }
            })
        }
    };
}

dashboard.productDetail = function(id){
    $.ajax({
        url : "https://ngandatabase.herokuapp.com/products/" + id,
        method: "GET",
        dataType: 'json',
        success : function(data){
            $('#ProductName').val(data.productName);
            $('#ProductImage').val(data.productImage);
            $('#Color').val(data.color);
            $('#Price').val(data.price);
            $('#Manufactory').val(data.manufactory);
            $('#Description').val(data.description);
            $('#productId').val(data.id);

            $('#addEditModal').find('.modal-title').text('Update Product');
            $('#btnProduct').text("Update");
            $('#addEditModal').modal('show');
        }
    });

}

dashboard.restForm = function(){
    $('#ProductName').val('');
    $('#ProductImage').val('');
    $('#Color').val('');
    $('#Price').val('');
    $('#Manufactory').val('Japan');
    $('#addEditModal').find('.modal-title').text('Create New Product');
    $('#btnProduct').text("Create");
    $('#Description').val('');
    $('#productId').val('0');
}





dashboard.init=function (){
    dashboard.drawTable();
}
$(document).ready(function(){
    dashboard.init();
});
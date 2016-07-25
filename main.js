$(function (){
	var order = $("#dataTable");
	var $name = $("#inputName");
	var $age = $("#inputAge");
	var orderTemplate = $("#data-template").html();
	function dataOrder(orders){
		order.append(Mustache.render(orderTemplate,orders));
	}
	$.ajax({
		type: 'GET',
		url:"http://localhost:8080/employee",
		success:function(data){
			$.each(data, function(i,orders){
				dataOrder(orders);
			});
		},
		error:function(){
			alert("Error loading Data");
		}
	});
	$("#add").on("click",function(){
		var newOrder = {
			name: $name.val(),
			age: $age.val(),
		};
		$.ajax({
			type: 'POST',
			url:"http://localhost:8080/employee",
			data: newOrder,
			success:function(addOrder){
				dataOrder(addOrder);
			}
		});

	});


	order.delegate(".remove" , "click",function(){
		var $li= $(this).closest('li');
		
		$.ajax({
			type: 'DELETE',
			url:"http://localhost:8080/employee/" + $(this).attr("data-id"),
			success:function(){
				$li.remove();
			}
			
		});

		});
	order.delegate(".editData" , "click",function(){
		var $li= $(this).closest('li');
		$li.find("input.name").val($li.find("span.name").html());
		$li.find("input.age").val($li.find("span.age").html());
		$li.addClass("edit");
	});

	order.delegate(".cancelData" , "click",function(){
		$(this).closest('li').removeClass("edit");
	});

	order.delegate(".saveEdit" , "click",function(){
		var $li= $(this).closest('li');
		var order1 = {
			name:$li.find("input.name").val(),
			age:$li.find("input.age").val()
		};
		$.ajax({
			type:'PUT',
			url:"http://localhost:8080/employee/" + $li.attr("data-id"),
			data:order1,
			success:function(addOrder){
				$li.find("span.name").html(order1.name);
				$li.find("span.age").html(order1.age);
				$li.removeClass("edit");
			},
			error:function(){
				alert("Error updating");
			}


		});
	});
		
		
		


});
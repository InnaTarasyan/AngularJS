

var app= angular.module('todoApp', [])
    .controller('todoController', function($scope) {

        $scope.tasks = [];
        $scope.completedTasks = [];
        $scope.allTasks=[];
        $scope.tasks2=[];
        var checked=false;
        var statuses=[];


        $scope.add = function () {
            if ($scope.title != "")
            {
                document.getElementById("input").value="";
                $scope.tasks.push({title:$scope.title,status:'active'});
                //$scope.allTasks.push({title:$scope.title,status:'active'});

            }

        };

        $scope.delete = function () {

            var idx = $scope.completedTasks.indexOf($scope.tasks[this.$index]);
            if (idx !== -1) {
                $scope.completedTasks.splice(idx, 1);
            }
            $scope.tasks.splice(this.$index, 1);
        };

        $scope.showCompleted = function () {

            if(count==0)
            {
                for(var i=0;i<$scope.tasks.length;i++)
                {
                    $scope.tasks2[i]=$scope.tasks[i];

                }
            }
            count++;
            //unSelectAllTasks();
            //$scope.allTasks=$scope.tasks;

            if(count>0)
                $scope.allTasks=$scope.tasks2;
            else
                $scope.allTasks=$scope.tasks;

            $scope.tasks = $scope.completedTasks;

            // $scope.completedTasks = [];
        };

        $scope.completed = function (param) {

            if ($scope.completedTasks.indexOf(param) == -1)
            {
                param.status='completed';
                $scope.completedTasks.push(param);
            }
            else {
                var idx = $scope.completedTasks.indexOf(param);
                param.status='active';
                if (idx !== -1) {
                    $scope.completedTasks.splice(idx, 1);
                }
            }
        };

        var count=0;
        $scope.showAll = function(){
            // unSelectAllTasks();

            if($scope.allTasks.length!=0)
                $scope.tasks=$scope.allTasks;

            if(count==0)
            {
                for(var i=0;i<$scope.tasks.length;i++)
                {
                    $scope.tasks2[i]=$scope.tasks[i];

                }
            }
            count++;


            //alert($scope.tasks2);

            //$scope.tasks=$scope.tasks2;

            // $scope.allTasks=[];

        };
        $scope.showActive=function(){

            if(count==0)
            {
                for(var i=0;i<$scope.tasks.length;i++)
                {
                    $scope.tasks2[i]=$scope.tasks[i];

                }
            }
            count++;

            if($scope.allTasks.length>0)
            $scope.tasks=$scope.allTasks;



            unSelectAllTasks();
            // $scope.allTasks=$scope.tasks;
            $scope.tasks = $scope.tasks.filter(function(x) { return $scope.completedTasks.indexOf(x) < 0 })

        };
        $scope.clearCompleted=function(){
            $scope.completedTasks=[];

            for(var i=0;i<$scope.tasks.length;i++){
                while($scope.tasks[i].status=="completed"){
                    $scope.tasks.splice(i,1);

                }
            }



        };
        $scope.selectAllRows=function(){

            if(checked==false) {


                for (var i = 0; i < $scope.tasks.length; i++) {
                    statuses.push($scope.tasks[i].status);
                    if($scope.tasks[i].status!="completed")
                        $scope.tasks[i].status = "completed";
                }

                // $scope.completedTasks=$scope.tasks;

                for(var i=0;i<$scope.tasks.length;i++){
                    if($scope.tasks[i].status=="completed"){
                        $scope.completedTasks[i]=$scope.tasks[i];
                    }
                }

                checked=true;
            }else if(checked==true){


                for(var i=0;i<$scope.tasks.length;i++){
                    $scope.tasks[i].status=statuses[i];
                    if( $scope.tasks[i].status=="active"){
                        var idx = $scope.completedTasks.indexOf( $scope.tasks[i]);
                        $scope.completedTasks.splice(idx, 1);
                    }

                }

               // alert(statuses);
                statuses=[];
                checked=false;
            }

        };

        $scope.edit=function(event,t){

            /*
            if(event.keyCode==13){
               var elements=document.getElementsByClassName("mytitle");

               for(var i=0;i<elements.length;i++){
                   elements[i].blur();
               }

            }*/

             var idx2 = $scope.tasks2.indexOf(t);

            var textInput=event.target.value;
            var idx = $scope.tasks.indexOf(t);

            $scope.tasks[idx]={title:textInput,status:'active'};
            $scope.tasks2[idx2]={title:textInput,status:'active'};


            $scope.showCompleted();

        }

    });


function selectImage(elem) {


    if(elem.src=="http://localhost/AngularJS/images/circle.png"){
        elem.src="images/selected.png";
        elem.parentElement.parentElement.children[1].style.opacity="0.5";
        elem.parentElement.parentElement.children[1].style.textDecoration="line-through";

    }else{
        elem.src="images/circle.png";
        elem.parentElement.parentElement.children[1].style.opacity="1.0";
        elem.parentElement.parentElement.children[1].style.textDecoration="none";

    }

}

function unSelectAllTasks()
{
    var elements=document.getElementsByClassName('sel');
    for(var i=0;i<elements.length;i++) {
        elements[i].src="images/circle.png";
        elements[i].parentElement.parentElement.children[1].style.opacity="1.0";
        elements[i].parentElement.parentElement.children[1].style.textDecoration="none";
    }
}


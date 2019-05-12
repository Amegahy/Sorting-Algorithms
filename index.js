var testArray = new Array (3,111,5,44,312,5,5,32,45,32,56,37);

function sort(type){


	if (type == 'bubbleSort'){
		
		document.getElementById("sortedArray").innerHTML = "Bubble sorted array = " + bubbleSort(testArray);

	}else if (type == 'selectionSort'){
		
		document.getElementById("sortedArray").innerHTML = "Selection sorted array = " + selectionSort(testArray);

	}else if (type == 'mergeSort') {

		document.getElementById("sortedArray").innerHTML = "Merge sorted array = " + mergeSort(testArray);
		
	}else if (type == 'insertionSort') {

		document.getElementById("sortedArray").innerHTML = "Insertion sorted array = " + insertionSort(testArray);
		
	}else if (type == 'quickSort') {

		document.getElementById("sortedArray").innerHTML = "Quick sorted array = " + quickSort(testArray, 0, testArray.length-1);
	
	}else if (type == 'heapSort') {

		document.getElementById("sortedArray").innerHTML = "Heap sorted array = " + heapSort(testArray);
	}
}

function bubbleSort(arr){

	var array = arr;

	var l = array.length;//Length of array

	var swaps = 0;//Number of swaps in this iteration 
	
	do{

		swaps = 0;
		
		for (var i = 0; i < l-1; i++){//Loop through array

			if(array[i] > array[i+1]){//If next index is lower than current index

				var temp = array[i];//Temp storage for an index being swapped 
				
				//Swapping indexes
				array[i] = array [i+1];
				array [i+1] = temp; 

				swaps++;//Increase swaps
			}
		}


	}while (swaps > 0);
	return array;
}

function selectionSort(arr){

	var array = arr;

	var l = array.length;//Length of array

	for (var i = 0; i < l; i++){//Loop through array (main loop)

		var min = i;//Default value for the minimum index value

		for (var j = i + 1; j < l; j++) {//Loop through to find minimum in this iteration
			
			if (array [j] < array[min]){

				var temp = array [j];//Temp storage for the minimum
				array [j] = array [min];//Swap the postions of the old and new minimum indexes
				array [min] = temp;//Assign new minimum
			}
		}
	}	

	return array;
}

function mergeSort(arr) {

	if (arr.length <= 1) {
		
		return arr;//Return array if there is only one element
	}

	var middle = arr.length / 2;//Find middle of the array

	//Divide the array into 2 sub arrays
	var left = arr.slice(0, middle);
	var right = arr.slice(middle);

	//Recursive point to seperate 
	return merge(mergeSort(left), mergeSort(right));
}

// Merge the two arrays into one
function merge(left, right) {
  
	var resultArray = [];
	var leftIndex = 0;
	var rightIndex = 0;

	//Concatenating values into the resultArray variable in order
	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex] < right[rightIndex]) {//The left array index is smaller than the right, so add it to the results array
			resultArray.push(left[leftIndex]);
			leftIndex++;//Move left array counter
		}else {
			resultArray.push(right[rightIndex]);
			rightIndex++;//Move right array counter
		}
	}

	return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));//Add the remaining index from either right or left as there will be one left over
}

function insertionSort(arr){

	var array = arr;

	for (var i = 1; i < array.length; i++) {//Main loop through array
		
		var key = array[i];//Index in array up for comparison
		var j = i - 1;//Previous index for comparison

		while (array[j] > key && j >= 0){//If the previous index is larger than the key

			array[j+1] = array[j];//The index after j must equal j in order to shift the array along one
			j--;
		}

		array[j+1] = key;//Since the last j-- would move past the correct insertion point
	}

	return array;
}

//Partition array to create pivot
function partition(arr, low, high){

	var array = arr;
	var pivot = array[high];//Pivot is the focus element, can be lowest, highest or random element in array
	var i = (low-1);//Index for the smaller element being compared to

	for (var j = low; j < high; j++) {//j is the variable for the larger element
		
		if (array[j] <= pivot) {//Current element is smaller than or greater than pivot

			i++;

			//Swap the current element for the smaller index to move larger element along
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	//Swap the pivot into correct place so everything to the left of it is smaller
	//And everything to the right is larger
	var temp = array[i+1];
	array[i+1] = array[high];
	array[high] = temp;

	return i+1;//Array index in the correct place
}

function quickSort(arr, low, high){

	var array = arr;

	if (low < high){

		var part = partition(array, low, high);//Partition the array so that arr[part] is in the correct place
		
		//Partition before and after the previous partition to sort the elements 
		quickSort(array, low, part-1);
		quickSort(array, part+1, high);
	}

	return array;
}

//Create a heap tree of an array
function createHeap (arr, n, i){

	var array = arr;
	var largest = i;//The root/focus element
	var size = n;//Size of the array
	var left = 2*i + 1;//Left child
	var right = 2*i + 2;//Right child

	//If the left child is larger than the root
	if (left < size && array[left] > array[largest]){

		largest = left;
	}

	//If the right child is larger than the root
	if (right < size && array[right] > array[largest]){

		largest = right;
	}

	//If the largest is not the root, only other possibility
	if (largest != i){

		//Make i the largest
		var temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;

		//Call recusrively and try again with i being the largest
		createHeap(array, size, largest);
	}
}

function heapSort (arr){

	var array = arr;
	var l = array.length;

	//Construct heap
	for (var i = l/2 - 1; i >= 0; i--){

		createHeap (array, l, i);
	}

	for (var i = l-1; i >=0; i--) {
		
		//Place current node at the root
		var temp = array[0];
		array[0] = array[i];
		array[i] = temp;

		//Create new sub tree with the current node and the rest of the tree 
		createHeap(array, i, 0);
	}

	return array;
}
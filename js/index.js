var cx = 'YOUR_CX_KEY';
var apiKey = 'YOUR_API_KEY'; 
var searchType = 'SEARCH_TYPE_UNDEFINED';
var url = '';
var start = 1;
var num = 10;

function search(query, startIndex) {
	startIndex = startIndex || 1;
	url = 'https://www.googleapis.com/customsearch/v1?q=' + query + '&cx=' + cx + '&key=' + apiKey + '&searchType=' +
		searchType + '&start=' + startIndex + '&num=' + num;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function () {
		if (xhr.status === 200) {
			var data = JSON.parse(xhr.responseText);
			if (searchType === 'SEARCH_TYPE_UNDEFINED') {
				var results = data.items;
				var html = '';
				for (var i = 0; i < results.length; i++) {
					html += '<h3><a href="' + results[i].link + '">' + results[i].title + '</a></h3>';
					html += '<p>' + results[i].snippet + '</p>';
				}
				document.getElementById('search-results').innerHTML = html;

	
				if (data.queries.nextPage) {
					var nextIndex = startIndex + num;
					var buttonHtml = '<button id="load-more" data-start="' + nextIndex + '">Load more</button>';
					document.getElementById('search-results').insertAdjacentHTML('beforeend', buttonHtml);
					document.getElementById('load-more').addEventListener('click', function (event) {
						event.preventDefault();
						var nextStartIndex = this.getAttribute('data-start');
						search(query, nextStartIndex);
					});
				}
			} else if (searchType === 'image') {
				var items = data.items;
				var html = '';
				for (var i = 0; i < items.length; i++) {
					html += '<a href="' + items[i].link + '" target="_blank"><img src="' + items[i].image
						.thumbnailLink + '"></a>';
				}
				document.getElementById('search-results').innerHTML = html;


				if (data.queries.nextPage) {
					var nextIndex = startIndex + num;
					var buttonHtml = '<button id="load-more" data-start="' + nextIndex + '">Load more</button>';
					document.getElementById('search-results').insertAdjacentHTML('beforeend', buttonHtml);
					document.getElementById('load-more').addEventListener('click', function (event) {
						event.preventDefault();
						var nextStartIndex = this.getAttribute('data-start');
						search(query, nextStartIndex);
					});
				}
			}
		} else if (xhr.status === 400) {
			alert('Bad Request. Please try again later.');
		} else if (xhr.status === 429) {
			setTimeout(function () {
				search(query, startIndex);
			}, 1000);
		} else {
			alert('Request failed. Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

document.getElementById('search-form').addEventListener('submit', function (event) {
	event.preventDefault();
	var query = document.getElementById('query').value;
	search(query);
});

document.getElementById('toggle-results').addEventListener('click', function (event) {
	event.preventDefault();
	if (searchType === 'SEARCH_TYPE_UNDEFINED') {
		searchType = 'image';
		document.getElementById('toggle-results').textContent = 'Web Results';
	} else {
		searchType = 'SEARCH_TYPE_UNDEFINED';
		document.getElementById('toggle-results').textContent = 'Images';
	}
	start = 1;
	search(document.getElementById('query').value);
});

document.getElementById('search-results').addEventListener('click', function (event) {
	if (event.target.id === 'load-more') {
		event.preventDefault();
		var nextStartIndex = parseInt(event.target.getAttribute('data-start'));
		search(document.getElementById('query').value, nextStartIndex);
	}
});

function search(query, startIndex) {
	startIndex = startIndex || 1;
	url = 'https://www.googleapis.com/customsearch/v1?q=' + query + '&cx=' + cx + '&key=' + apiKey + '&searchType=' +
		searchType + '&start=' + startIndex + '&num=' + num;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function () {
		if (xhr.status === 200) {
			var data = JSON.parse(xhr.responseText);
			if (searchType === 'SEARCH_TYPE_UNDEFINED') {
				var results = data.items;
				var html = '';
				for (var i = 0; i < results.length; i++) {
					html += '<h3><a href="' + results[i].link + '">' + results[i].title + '</a></h3>';
					html += '<p>' + results[i].snippet + '</p>';
				}
				document.getElementById('search-results').innerHTML = html;
				
				if (data.queries.nextPage) {
					var nextIndex = startIndex + num;
					var buttonHtml = '<button id="load-more" data-start="' + nextIndex + '">Load more</button>';
					document.getElementById('search-results').insertAdjacentHTML('beforeend', buttonHtml);
					document.getElementById('load-more').addEventListener('click', function (event) {
						event.preventDefault();
						var nextStartIndex = this.getAttribute('data-start');
						search(query, nextStartIndex);
					});
				}
			} else if (searchType === 'image') {
				var items = data.items;
				var html = '';
				for (var i = 0; i < items.length; i++) {
					html += '<a href="' + items[i].link + '" target="_blank"><img src="' + items[i].image
						.thumbnailLink + '"></a>';
				}
				document.getElementById('search-results').innerHTML = html;


				if (data.queries.nextPage) {
					var nextIndex = startIndex + num;
					var buttonHtml = '<button id="load-more" data-start="' + nextIndex + '">Load more</button>';
					document.getElementById('search-results').insertAdjacentHTML('beforeend', buttonHtml);
					document.getElementById('load-more').addEventListener('click', function (event) {
						event.preventDefault();
						var nextStartIndex = this.getAttribute('data-start');
						search(query, nextStartIndex);
					});
				}
			}
		} else if (xhr.status === 400) {
			alert('Bad Request. Please try again later.');
		} else if (xhr.status === 429) {
			setTimeout(function () {
				search(query, startIndex);
			}, 1000);
		} else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

'use strict';

const HOST = 'http://localhost:3030';

function articleDateline(date) {
    let day = new Date(date).getDate();
    let month = new Date(date).toLocaleString('en-us', {month: 'long'});
    let year = new Date(date).getFullYear();
    let p = document.createElement('p');
    p.classList.add('dateline');
    p.innerHTML = `<span class="day">${day}</span><span class="month">${month}</span><span class="year">${year}</span>`;
    return p;
}

function articleTitle(slug, title) {
    var a = document.createElement('a');
    a.classList.add('title');
    a.setAttribute('href', `/blog/${slug}`);
    a.innerHTML = `${title}`;
    return a;
}

function articleTags(tags) {
    let ul = document.createElement('ul');
    ul.classList.add('tags');
    tags.forEach(tag => {
        let li = document.createElement('li');
        li.innerHTML = `${tag}`;
        ul.appendChild(li);
    });
    return ul;
}

function addArticles(articles) {
    let postsList = document.getElementById('postsList');
    articles.forEach(article => {
        let post = document.createElement('li');
        post.classList.add('post');
        post.appendChild(articleDateline(article.date));
        post.appendChild(articleTitle(article.slug, article.title));
        post.appendChild(articleTags(article.tags));
        postsList.append(post);
    });
}

function blurbTitle(type) {
    let title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = `#${type}`;
    return title;
}

function blurbArtistInformation(artist, track) {
    let text = document.createElement('div');
    text.classList.add('mb-1', 'text-muted');
    text.innerHTML = `${track} by ${artist}`
    return text;
}

function blurbArtwork(base64) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src', `data:image/png;base64,${base64}`);
    img.setAttribute('width', '100%');
    div.appendChild(img);
    return div;
}

function blurbBody(payload) {
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.appendChild(blurbTitle(payload.type));
    cardBody.appendChild(blurbArtistInformation(payload.artist, payload.track));
    cardBody.appendChild(blurbArtwork(payload.artwork));
    return cardBody;
}

function addBlurbs(blurbs) {
    let blurbsList = document.getElementById('blurbsDiv');
    blurbs.forEach(payload => {
        let blurb = document.createElement('div');
        blurb.classList.add('card');
        blurb.appendChild(blurbBody(payload));
        blurbsList.append(blurb);
    });
}

fetch(`${HOST}/blog`)
    .then(data => {
        return data.json();
    }).then(articles => {
        addArticles(articles);
    }).catch(err => {
        console.log(err);
    });

fetch(`${HOST}/blurbs`)
    .then(data => {
        return data.json();
    }).then(blurbs => {
        addBlurbs(blurbs);
    }).catch(err => {
        console.log(err);
    });
    
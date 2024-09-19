function js(s, c) {
    this.nodes = this.getSelector(s, c);
    this.length = this.nodes.length >= 0 ? this.nodes.length : -1;
};
js.prototype.getSelector = function (s, c) {
    if (s instanceof HTMLElement) {
        return [s];
    }
    if (s instanceof Array) {
        return [].slice.call(s);
    }
    if (s instanceof Object) {
        return [s];
    }
    if (s && typeof s !== 'string') {
        return [s];
    }
    c = c || document;
    if (/^#(?:[\w-]|\\.|[^\x00-\xa0])*$/.test(s)) {
        const e = c.getElementById(s.substring(1));
        return e ? [e] : [];
    }
    return [].slice.call(c.querySelectorAll(s) || []);
};
js.prototype.create = function (s) {
    if (s && typeof s !== 'string') {
        if (s.length !== undefined) {
            return s;
        }
        return [s];
    }
    return document.createElement(s);
};
js.prototype.append = function (v) {
    this.get(0).append(v);
};
js.prototype.prepend = function (v) {
    this.get(0).prepend(v);
};
js.prototype.first = function () {
    return this.has() ? $(this.get(0)) : this;
};
js.prototype.last = function () {
    return this.has() ? $(this.get(this.length - 1)) : this;
};
js.prototype.get = function (i) {
    if (i == undefined) {
        return this.nodes;
    }
    if (!Number.isInteger(i)) {
        return undefined;
    }
    return this.nodes[i] ?? undefined;
};
js.prototype.eq = function (i) {
    const e = this.get(i);
    return e !== undefined ? $(e) : undefined;
};
js.prototype.has = function (i = 0) {
    return this.get(i) === undefined ? false : true;
};
js.prototype.remove = function () {
    return this.get(0).remove();
};
js.prototype.find = function (s) {
    return this.has() ? $(s, this.get(0)) : undefined;
};
js.prototype.each = function (c) {
    if (!this.length) {
        return this;
    }
    this.nodes.forEach(c);
    return this;
};
js.prototype.addEvent = function (e, l, o = false) {
    var events = e.split(' ');
    for (var i = 0, size = events.length; i < size; i++) {
        this.get(0).addEventListener(events[i], l, o)
    }
};
js.prototype.removeEvent = function (e, l, o = false) {
    var events = e.split(' ');
    for (var i = 0, size = events.length; i < size; i++) {
        this.get(0).removeEventListener(events[i], l, o)
    }
};
js.prototype.html = function (v) {
    if (v !== undefined) {
        if (typeof v == 'string') {
            this.get(0).innerHTML = v;
        }
        if (typeof v == 'function') {
            this.get(0).innerHTML = v(this.get(0).innerHTML);
        }
    }
    return this.get(0).innerHTML;
};
js.prototype.text = function (v) {
    if (v !== undefined) {
        if (typeof v == 'string') {
            this.get(0).innerText = v;
        }
        if (typeof v == 'function') {
            this.get(0).innerText = v(this.get(0).innerText);
        }
    }
    return this.get(0).innerText;
};
js.prototype.val = function (v) {
    if (v !== undefined) {
        if (typeof v == 'string') {
            this.get(0).value = v;
        }
        if (typeof v == 'function') {
            this.get(0).value = v(this.get(0).value);
        }
    }
    return this.get(0).value;
};
js.prototype.attr = function (k, v) {
    if (v !== undefined) {
        if (typeof v == 'string') {
            this.get(0).setAttribute(k, v);
        }
        if (v == null) {
            this.get(0).removeAttribute(k);
            return this;
        }
    }
    return this.get(0).getAttribute(k);
};
js.prototype.class = function () {
    let classList = function (v) {
        this.class = v;
    };
    classList.prototype.has = function (v) {
        return this.class.contains(v);
    };
    classList.prototype.add = function (v) {
        return this.class.add(v);
    };
    classList.prototype.remove = function (v) {
        return this.class.remove(v);
    };
    classList.prototype.toggle = function (v) {
        return this.class.toggle(v);
    };
    return new classList(this.get(0).classList);
};
const $ = (s, c) => {
    return new js(s, c);
};
$.getDomain = () => {
    return window.location.host;
};
$.getURLOrigin = () => {
    return window.location.origin;
};
$.getURLCurrent = () => {
    return window.location.origin + window.location.pathname;
};
$.pageNotFound = () => {
    $('html').html(`<head><title>Not Found</title><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><link rel="dns-prefetch" href="//fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin><link href="https://fonts.googleapis.com/css?family=Roboto:400" rel="stylesheet"><style>*{-webkit-tap-highlight-color:transparent;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:none}body{font-family:"Roboto",system-ui,Helvetica,Arial,sans-serif;color:#a0aec0;background-color:#1a202c;font-size:20px;padding:0;margin:0}.container{display:block}.error{margin:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:1rem;min-height:100vh}.error>.error-body{display:block}.error>.error-body>.error-status-code{display:inline-block}.error>.error-body>.error-text{display:inline-block;text-transform:uppercase;border-left:1px solid #e2e8f0;padding-left:15px;padding-bottom:3px;margin-left:15px}</style></head><body><div class="container"><div class="error"><div class="error-body"><div class="error-status-code">404</div><div class="error-text">Not Found</div></div></div></div></body>`);
};
$.loadEvent = (events, callback) => {
    let isLoaded = false;
    $(window).addEvent(events, () => {
        if (isLoaded === false) {
            callback();
            isLoaded = true
        }
    });
};
$.meta = {
    title: 'Sĩ Ben',
    desc: 'Sĩ Ben là trang web Blog cá nhân chuyên chia sẻ miễn phí các kiến thức, thủ thuật, mẹo hay liên quan đến lập trình và phát triển phần mềm hàng đầu VN.',
    image: 'https://sibenvn.github.io/assets/thumbnail.png'
};
$.labels = {
    'thu-thuat': 'Thủ Thuật',
    'lap-trinh': 'Lập Trình',
    'tin-tuc': 'Tin Tức',
    'meo-vat': 'Mẹo Vặt',
    'linh-tinh': 'Linh Tinh'
};
$.pageToken = '';
$.getPath = () => {
    return window.location.pathname;
};
$.isBlogPath = (str) => {
    return str.match(new RegExp(/^\/([0-9]+){4,4}\/([0-9]+){2,2}\/([a-z0-9-_]+)\.html$/));
};
$.buildAPI = (path = '/', params = {}) =>
{
    const id = '2645484775443145447';
    Object.assign(params, {
        key: 'AIzaSyDWA8E9Aj8dQ4YZZIm779_XvvHxyd4w8jE'
    });
    const query = (new URLSearchParams(params)).toString();
    return `https://www.googleapis.com/blogger/v3/blogs/${id + path}?${query}`;
};
$.fetchPosts = async (label = '', token = '') =>
{
    const params = {
        fields: 'items(url,title,labels,updated,published),nextPageToken',
        maxResults: 10
    };
    if (label !== '') {
        Object.assign(params, {
            labels: label
        });
    }
    if (token !== '') {
        Object.assign(params, {
            pageToken: token
        });
    }
    const response = await fetch($.buildAPI('/posts', params));
    return await response.json();
}
$.fetchPost = async (path) =>
{
    if (!$.isBlogPath(path)) {
        return undefined;
    }
    const response = await fetch($.buildAPI('/posts/bypath', {
        path: path,
        fields: 'title,content,labels,updated,published'
    }));
    return await response.json();
}
$.removeDomain = (str) => {
    return str.replace(/^.*\/\/[^\/]+/, '');  
};
$.blogToPath = (url) => {
    url = url.replace('.html', '');
    let str = url.split('/');
    return '/' + str[3] + '-' + str[1] + str[2];
};
$.pathToBlog = (url) => {
    let str = url.split('-');
    let last = str[str.length - 1];
    str.pop();
    let result = '/' + last.slice(0, 4) + '/' + last.slice(4, 6) + str.join('-') + '.html';
    if (!$.isBlogPath(result)) {
        return undefined;
    }
    return result;
};
$.layouts = () => {
    const head = $('head');
    head.html(v => v + `
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" name="robots">
        <meta content="notranslate" name="robots">
        <meta content="notranslate" name="google"/>
        <meta content="nohover" name="pinterest">
        <meta content="index, follow" name="Googlebot">
        <meta content="index, follow, noodp" name="ROBOTS">
        <meta content="index, follow" name="BingBOT">
        <meta content="index, follow" name="yahooBOT">
        <meta content="index, follow" name="slurp">
        <meta content="index, follow" name="msnbot">
        <meta name="referrer" content="origin">
        <link rel="preconnect dns-prefetch" href="//www.googletagmanager.com">
        <link rel="preconnect dns-prefetch" href="//www.google-analytics.com">
        <link rel="preconnect dns-prefetch" href="//ajax.googleapis.com">
        <link rel="preconnect dns-prefetch" href="//cdnjs.cloudflare.com">
        <link rel="preconnect dns-prefetch" href="//pagead2.googlesyndication.com">
        <link rel="preconnect dns-prefetch" href="//googleads.g.doubleclick.net">
        <link rel="preconnect dns-prefetch" href="//tpc.googlesyndication.com">
        <link rel="preconnect dns-prefetch" href="//ad.doubleclick.net">
        <link rel="preconnect dns-prefetch" href="//www.gstatic.com">
        <link rel="preconnect dns-prefetch" href="//cse.google.com">
        <link rel="preconnect dns-prefetch" href="//fonts.gstatic.com">
        <link rel="preconnect dns-prefetch" href="//fonts.googleapis.com">
        <link rel="preconnect dns-prefetch" href="//sibenvn.github.io">
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
        <link rel="canonical" href="${$.getURLCurrent()}">
    `);
    return `
    <header>
        <div class="container clear">
            <div class="nav">
                <div class="nav-header">
                    <div class="nav-title"><a href="/">siben</a></div>
                </div>
                <input type="checkbox" id="nav-check">
                <div class="nav-btn">
                    <label for="nav-check"><span></span><span></span><span></span></label>
                </div>
                <nav>
                    <ul>
                        <li><a href="/">Trang Chủ</a></li>
                        <li><a href="/thu-thuat">Thủ Thuật</a></li>
                        <li><a href="/lap-trinh">Lập Trình</a></li>
                        <li><a href="/tin-tuc">Tin Tức</a></li>
                        <li><a href="/meo-vat">Mẹo Vặt</a></li>
                        <li><a href="/linh-tinh">Linh Tinh</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <main>
        <div class="container clear" id="blog">
    </div>
    </main>
    <footer>
        <div class="container clear">
            <p class="copyright">Copyright &copy; 2020 - siben.vn</p>
        </div>
    </footer>
    `;
};
$.show = (e) => {
    if (e.class().has('hidden')) {
        e.class().remove('hidden');
    }
};
$.hide = (e) => {
    if (!e.class().has('hidden')) {
        e.class().add('hidden');
    }
};
$.strToDateFormatDMY = (str) => {
    let date = new Date(str);
    return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();
};
$.showPost = (el, item) => {
    let url = $.blogToPath($.removeDomain(item['url']));
    let labels = '';
    item['labels'].forEach((label) => {
        if ($.labels.hasOwnProperty(label)) {
            labels += (labels == '' ? '' : ', ') + `<a class="category" href="/${label}">${$.labels[label]}</a>`;
        }
    });
    el.html(v => v + `
        <article class="post">
            <h2><a href="${url}">${item['title']}</a></h2>
            <p>${labels} - ${$.strToDateFormatDMY(item['published'])}</p>
        </article>
    `);
};
$.seo = (meta) => {
    const head = $('head');
    head.html(v => v + `
        <title>${meta.title}</title>
        <meta name="description" content="${meta.desc}">
        <meta property="og:title" content="${meta.title}">
        <meta property="og:description" content="${meta.desc}">
        <meta property="og:image" content="${meta.image}">
        <meta property="og:url" content="${$.getURLCurrent()}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="${$.getDomain()}">
        <meta property="og:locale:alternate" content="vi_VN">
    `);
};
$.getImage = (str) => {
    let match = str.match(/src="(.+?)"/);
    return match ? match[1] : $.meta.image;
};
$.ads = (id) => {
    let tag = $().create('script');
    tag.type = "text/javascript";
    tag.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`;
    tag.async = true;
    tag.setAttribute('crossorigin', 'anonymous');
    $('head').append(tag);
};
$.gtag = (id) => {
    let tag = $().create('script');
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    tag.type = "text/javascript";
    tag.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', id);
    };
    $('head').append(tag);
};
$.loadEvent('scroll click', () => {
    $.ads('ca-pub-8393244368108183');
    $.gtag('G-DR4NXL3E6T');
});
$.handler = async (path) => {
    if (path == '/' || $.labels.hasOwnProperty(path.replace('/', ''))) {
        let text = path.replace('/', '');
        if (path == '/') {
            $.seo($.meta);
        } else {
            $.seo({
                title: $.labels[text],
                desc: `Chuyên mục đăng tải các bài viết hay liên quan về ${$.labels[text]} trên Blog.`,
                image: $.meta.image
            });
        }
        $('#blog').html(`
            <div class="blog">
            <div class="posts" id="posts"></div>
            <div id="loading" class="lds-ellipsis hidden"><div></div><div></div><div></div><div></div></div>
            <div class="pagination">
            <button id="showmore">Xem Thêm</button>
            </div>
            </div>
        `);
        const loading = $('#loading'), showmore = $('#showmore');
        $.show(loading);
        $.hide(showmore);
        let data = await $.fetchPosts(text);
        if (!('items' in data)) {
            $('#blog').html('<p style="text-align: center;color: #5c5757;padding: 38px 0px 24px 0px">Chưa có đăng bài nào cả.</p>');
            return;
        }
        data['items'].forEach((item) => {
            $.showPost($('#posts'), item);
        });
        $.hide(loading);
        if ('nextPageToken' in data) {
            $.pageToken = data['nextPageToken'];
            $.show(showmore);
        } else {
            $.pageToken = '';
            $.hide(showmore);
        }
        showmore.addEvent('click', async () => {
            $.show(loading);
            $.hide(showmore);
            data = await $.fetchPosts('', $.pageToken);
            data['items'].forEach((item) => {
                $.showPost($('#posts'), item);
            });
            $.hide(loading);
            if ('nextPageToken' in data) {
                $.pageToken = data['nextPageToken'];
                $.show(showmore);
            } else {
                $.pageToken = '';
                $.hide(showmore);
            }
        });
    } else if (path.match(new RegExp(/^\/([a-z0-9-_]+)\-([0-9]+){4,4}$/))) {
        $('#blog').html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
        let blogPath = $.pathToBlog(path);
        if (!blogPath) {
            $.pageNotFound();
            return;
        }
        const data = await $.fetchPost(blogPath);
        if (!('content' in data)) {
            $.pageNotFound();
            return;
        }
        $('#blog').html(`
            <article class="post-content" id="post">
                <h1>${data['title']}</h1>
                ${data['content']}
            </article>
        `);
        let text = $('#post').text();
        text = text.replace(/(\r\n|\n|\r)/gm, "").replace(data['title'], '');
        if (text.length > 97) {
            text = text.substring(0, 97).replace(/^\s+|\s+$/gm,'') + '...';
        }
        $.seo({
            title: data['title'],
            desc: text,
            image: $.getImage(data['content'])
        });
    } else {
        $.pageNotFound();
    }
};
window.onload = async () => {
    $('body').html($.layouts());
    await $.handler($.getPath());
};

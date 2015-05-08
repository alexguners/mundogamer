var start = 12;
var isLoading = false;
$(window).scroll(function () {

    if (($(window).scrollTop() >= $(document).height() - $(window).height() - 10) && !isLoading) {
        isLoading = true;
        $('div#loadmoreajaxloader').show();

        $.ajax({
            url: "/load/" + start,
            success: function (noticias) {

                if (noticias) {
                    var html = "",
                    set = 4,
                    rows = parseInt(noticias.length / set),
                    resto = noticias.length % set,
                    initrow = 0;
                    rows += resto;
                    
                    if (rows < 1) {

                    } else {

                        for (var j = 0; j < rows; j++) {

                            limite = (j + 1) * set;

                            if (limite > noticias.length) {
                                limite = noticias.length;
                            }


                            html += '<div class="row">';
                            for (var i = initrow; i < limite; i++) {
                                 html += '<div class="col-sm-6 col-md-3"><div class="thumbnail estilonoticia estilonoticia-hot fixHeight" >';
                                if (noticias[i].src) {

                                    html += '<a href="' + noticias[i].src + '" class="titulo" target="_blank" idnoticia="' + noticias[i].url + '"><img src="/images/noticia/capa/';
                                    
                                } else {
                                    
                                      html += '<a href="/noticia/' + noticias[i].url + '" class="titulo" target="_blank" idnoticia="' + noticias[i]._id + '"> <img src="/images/noticia/capa/';                                    
                                }

                                    html += noticias[i]._id;

                                    html += '" alt="..."><div class="caption">';
                                    var tags = noticias[i].tags;
                                    if (tags) {

                                        for (var k = 0; k < tags.length; k++) {
                                            html += '<span class="label label-danger" style="margin-left:6px;">' + tags[k].nome + '</span> ';
                                        }
                                    } else {
                                        html += '<span class="label label-danger" style="padding-left:10px;" >NotÃ­cias</span>';
                                    }

                                    html += '<p class="titulo">' + noticias[i].titulo.substr(0, 38) + '</p>';

                                    var text = noticias[i].descricao.toString().replace(/<.*?>/g, '').substr(0, 90);
                                    html += '<p class="descricao">' + text + '... (ver mais)' + '</p></div></a>';
                                
                                html += '</div></div>';

                            }
                            initrow = initrow + set;
                            html += '</div>';

                        }

                    }

                    $("div#feed").append(html);
                    $('div#loadmoreajaxloader').hide();
                    start += 12;
                    isLoading = false;
                } else {
                    $('div#loadmoreajaxloader').html('<center>NÃ£o hÃ¡ mais noticias...</center>');
                    isLoading = false;
                }
            }
        });
    }

});
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
                                 html += '<div class="col-sm-6 col-md-3 noticiaanimator">';

                                 /* Validação dos Tile das notícias que são carregadas ao rolar a página principal */
                                
                                if (typeof noticias[i].tipo !== 'undefined') {

                                    if (noticias[i].tipo == 'Noticia') {

                                        html += '<div class="estilonoticia estilonoticia-hot fixHeight">' ;
                                        
                                    } else if (noticias[i].tipo == 'Análise') {
                                        
                                          html += '<div class="estiloanalise estiloanalise-hot fixHeight">'; 

                                    } else if (noticias[i].tipo == 'Video/Gameplay') {

                                        html += '<div class="estilovideogameplay estilovideogameplay-hot fixHeight">'; 

                                    } else if (noticias[i].tipo == 'Video/Trailer') {

                                        html += '<div class="estilovideotrailer estilovideotrailer-hot fixHeight">';

                                    } else if (noticias[i].tipo == 'Vídeo/Entrevista'){ 

                                        html += '<div class="estilovideoentrevista estilovideoentrevista-hot fixHeight">';

                                    }else {

                                        html += '<div class="estilovideotrailer estilovideotrailer-hot fixHeight">';

                                    }
                                } else{
                                        html += '<div class="estilonoticia estilonoticia-hot fixHeight">';
                                }
                                /* VFim da alidação dos Tile das notícias que são carregadas ao rolar a página principal */

                                if (noticias[i].src) {

                                    html += '<a href="' + noticias[i].src + '" class="titulo" target="_blank" idnoticia="' + noticias[i].url + '"><img class=" img-responsive" src="/images/noticia/capa/' ;
                                    
                                } else {
                                    
                                      html += '<a href="/noticia/' + noticias[i].url + '" class="titulo" target="_blank" idnoticia="' + noticias[i]._id + '"> <figure><img src="/images/noticia/capa/';                                    
                                }

                                    html += noticias[i]._id;

                                    html += '" alt="..." class=" img-responsive"></figure>';

                                    html += '<small><center>' + noticias[i].titulo.substr(0, 60) + '</small></center>';

                                    var text = noticias[i].descricao.toString().replace(/<.*?>/g, '').substr(0, 90);
                                    html += '<p class="descricao">' + text + '... (Ler mais)' + '</p></a>';
                                
                                html += '</div></div>';

                            }
                            initrow = initrow + set;
                            html += '</div></div>';

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
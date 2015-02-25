$(document).ready(function () {
    //var urlRegex = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/igm;
    function testUrl(url) {
        var regex = new RegExp(
            "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
        return regex.test(url);
    }
    var headerUpdate = $.getJSON('php/select/jsonHeader.php', function (data) {
        $.each(data, function (i, ent) {
            $('#hdr-txt-update').attr('value', ent['hdrTxt']);
            $('#author-update').attr('value', ent['author']);
            $('#fb-update').attr('value', ent['fbIcon']);
            $('#twit-update').attr('value', ent['twitIcon']);
            $('#header-id').attr('value', ent['hdrID']);
        });
        headerUpdate.done(function () {
            $('#header-form').submit(function () {
                var fb = $('#fb-update').val();
                var twit = $('#twit-update').val();
                if (!testUrl(fb, twit) || $('#header-form :input').val() === "") {
                    $('.update-response').html('Please enter valid information.');
                    $('#header-update-error').show('fast').fadeOut(2000);
                } else {
                    var formData = $(this).serialize();
                    console.log(formData);
                    var updateHeader = $.post('php/update/updateHeader.php', formData, function (data) {

                        if (data.status !== true) { //status returns as true, however the comparison says it is false - not the most elegant of fixes
                            $('.update-response').html('Successfully updated.');
                            $('#header-update-success').show('fast').fadeOut(2000, function () {
                                window.location.reload(true);
                            });

                        } else {
                            $('.update-response').html('Update failed.');
                            $('#header-update-error').show('fast').fadeOut(2000);
                        }

                    });
                }
            });
        });
    });

    $('#time-select-button').click(function () {
        var timeId = $(this).parents('form').find('select').val();
        var showTime = $.getJSON("php/select/selectTime.php?q=" + timeId, function (data) {
            $.each(data, function (i, ent) {
                $('#mon').attr('value', ent['Mon']);
                $('#mon-close').attr('value', ent['MonClose']);
                $('#tues').attr('value', ent['Tues']);
                $('#tues-close').attr('value', ent['TuesClose']);
                $('#wed').attr('value', ent['Wed']);
                $('#wed-close').attr('value', ent['WedClose']);
                $('#thurs').attr('value', ent['Thurs']);
                $('#thurs-close').attr('value', ent['ThursClose']);
                $('#fri').attr('value', ent['Fri']);
                $('#fri-close').attr('value', ent['FriClose']);
                $('#sat').attr('value', ent['Sat']);
                $('#sat-close').attr('value', ent['SatClose']);
                $('#sun').attr('value', ent['Sun']);
                $('#sun-close').attr('value', ent['SunClose']);
                $('#time-id-update').attr('value', ent['timeID']);
            });
            showTime.done(function () {
                $('#time-update-form').submit(function () {
                    if ($('#time-update-form :input').val() === "") {
                        $('.update-response').html('Please enter valid information.');
                        $('#time-update-error').show('fast').fadeOut(2000);
                    } else {
                        var formData = $(this).serialize();
                        console.log(formData);
                        var updateTime = $.post('php/update/updateTiming.php', formData, function (data) {
                            if (data.status !== true) { //status returns as true, however the comparison says it is false - not the most elegant of fixes
                                $('.update-response').html('Successfully updated.');
                                $('#time-update-success').show('fast').fadeOut(2000, function () {
                                    window.location.reload(true);
                                });

                            } else {
                                $('.update-response').html('Update failed.');
                                $('#time-update-error').show('fast').fadeOut(2000);
                            }
                        });
                    }
                });
            });
        });
    });

    var itemJson = $.getJSON("php/select/json.php", function (data) {
        $.each(data, function (i, ent) {
            $("<div class='item-edit-container col-lg-4'>" +
            "<h2>" + ent['itemName'] + "</h2>" +
            "<p><b>Description:</b> " + ent['itemTxt'] + "</p>" +
            "<p><b>Address line one:</b> " + ent['AddressOne'] + "</p>" +
            "<p><b>Address line two:</b> " + ent['AddressTwo'] + "</p>" +
            "<p><b>Postcode:</b> " + ent['Postcode'] + "</p>" +
            "<p><b>Image URL:</b> <a href='" + ent['itemImg'] + "'>" + ent['itemImg'] + "</a></p>" +
            "<p><b>Time ID:</b> " + ent['timeID'] + "</p>" +
            "<p class='item-id'>" + ent['itemID'] + "</p>" +
            '<div class="btn-group" role="group" aria-label="crud-btn">' +
            "<button type='button' class='btn btn-default btn-primary btn-lg update' data-toggle='modal' data-target='#item-modal'>Update</button>" +
            "<button type='button' class='btn btn-default btn-danger btn-lg delete'  data-toggle='modal' data-target='#item-modal-delete'>Delete</button></div>").appendTo('#edit-page');
        });

        itemJson.done(function () {
            var itemID;
            $('.update').click(function () {
                var itemID = parseInt($(this).parents('.item-edit-container').find('.item-id').text());
                console.log(itemID);
                $.getJSON("php/select/json.php?q=" + itemID, function (data) {
                    $.each(data, function (i, ent) {
                        $('#item-name-edit').attr('value', ent['itemName']);
                        $('#first-line-edit').attr('value', ent['AddressOne']);
                        $('#second-line-edit').attr('value', ent['AddressTwo']);
                        $('#postcode-edit').attr('value', ent['Postcode']);
                        $('#item-img-edit').attr('value', ent['itemImg']);
                        $('#item-txt-edit').text(ent['itemTxt']);
                        $('#item-id-edit').attr('value', ent['itemID']);
                        $('#delete-item').attr('value', ent['itemID']);
                    });
                });
            });

            $('.delete').click(function () {
                var itemID = parseInt($(this).parents('.item-edit-container').find('.item-id').text());
                console.log(itemID);

                $.getJSON("php/select/json.php?q=" + itemID, function (data) {
                    $.each(data, function (i, ent) {
                        $('#delete-item').attr('value', ent['itemID']);
                    });
                });
            });
        });

        itemJson.fail(function () {
            console.log('Header JSON has failed to parse');
        });
    });

    $.getJSON("php/select/selectTime.php", function (data) {
        $.each(data, function (i, ent) {
            $('<option value="' + ent['timeID'] + '">' + ent['timeID'] + '</option>').appendTo('.edit-time-id');
            $('<option value="' + ent['timeID'] + '">' + ent['timeID'] + '</option>').appendTo('.insert-time-id');
        });
    });

    $('#edit-item-form').submit(function () {
        var url = $('#item-img-edit').val();
        if ($('#edit-item-form :input').val() == "" || !testUrl(url) || $('#item-txt-edit').val() == "" || $('#item-txt-edit').val() > 500) {
            $('.update-response').html('Please enter valid information.');
            $('#update-error').show('fast').fadeOut(2000);
        } else {
            var formData = $(this).serialize();
            var updateItem = $.post('php/update/update.php', formData, function (data) {

                if (data.status !== true) { //status returns as true, however the comparison says it is false - not the most elegant of fixes
                    $('.update-response').html('Successfully updated.');
                    $('#update-success').show('fast').fadeOut(2000, function () {
                        window.location.reload(true);
                    });

                } else {
                    $('.update-response').html('Update failed.');
                    $('#update-error').show('fast').fadeOut(2000);
                }
            });
            updateItem.fail(function (status, err) {
                console.log(status + ", " +err +' form submission failed');
            });
            return false; //make sure page doesn't refresh on form submit
        }
    });

    $('#insert-item-form').submit(function () {
        var url = $('#item-img-insert').val();
        if ($('#insert-item-form :input').val() == "" || !testUrl(url) || $('#item-txt-insert').val() == "" || $('#item-txt-insert').val() > 500) {
            $('.insert-response').html('Please enter valid information.');
            $('#insert-error').show('fast').fadeOut(2000);
        } else {
            var formData = $(this).serialize();
            console.log(formData);
            var insertItem = $.post('php/insert/insert.php', formData, function (data) {

                if (data.status !== true) {
                    $('.insert-response').html('Successfully inserted.');
                    $('#insert-success').show('fast').fadeOut(2000, function () {
                        window.location.reload(true);
                    });

                } else {
                    $('.insert-response').html('Insert failed.');
                    $('#insert-error').show('fast').fadeOut(2000);
                }
            });
            insertItem.fail(function (status, err) {
                console.log('form submission failed');
            });
            return false; //make sure page doesn't refresh on form submit
        }
    });

    $('#delete-item-form').submit(function () {
        var formData = $(this).serialize();
        console.log(formData);
        var insertItem = $.post('php/delete/delete.php', formData, function (data) {

            if (data.status !== true) {
                window.location.reload(true);

            } else {
                alert('Item deletion failed');
            }
        });

        insertItem.fail(function (status, err) {
            console.log('form submission failed');

        });
        return false; //make sure page doesn't refresh on form submit
    });
});
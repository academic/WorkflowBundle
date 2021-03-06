jQuery(document).ready(function($) {
    var localeMessages = {
        'tr': {
            addOption: 'Seçenek Ekle',
            allFieldsRemoved: 'Tüm Alanlar Silindi.',
            allowSelect: 'Seçmeye İzin Ver',
            allowMultipleFiles: 'Kullanıcıların Birden Fazla Dosya Yüklemesine İzin Ver',
            autocomplete: 'Otomatik Tamamlama',
            button: 'Buton',
            cannotBeEmpty: 'Bu Alan Boş Olamaz',
            checkboxGroup: 'Onay Kutusu Grubu',
            checkbox: 'Onay Kutusu',
            checkboxes: 'Onay Kutuları',
            className: 'Sınıf',
            clearAllMessage: 'Tüm Alanları Silmek İstediğinize Emin misiniz?',
            clearAll: 'Temizle',
            close: 'Ön İzle',
            content: 'İçerik',
            copy: 'Panoya Kopyala',
            dateField: 'Tarih',
            description: 'Açıklama',
            descriptionField: 'Açıklama',
            devMode: 'Geliştirici Modu',
            editNames: 'İsimleri Düzenle',
            editorTitle: 'Form Elemanları',
            editXML: 'XML Düzenle',
            enableOther: 'Diğerine Olanak Ver',
            enableOtherMsg: 'Kullanıcıların "DİĞER" eklemesine izin ver',
            fieldDeleteWarning: 'Alan Silme Uyarısı',
            fieldVars: 'Alan Değişkenleri',
            fieldNonEditable: 'Bu Alan Düzenlenemez.',
            fieldRemoveWarning: 'Bu Alanı Silmek İstediğinize Emin misiniz?',
            fileUpload: 'Dosya Yükleme',
            formUpdated: 'Form Güncellendi',
            getStarted: 'Bir Alanı Buraya Sürükleyin',
            header: 'Başlık',
            hide: 'Düzenle',
            hidden: 'Gizli Girdi',
            label: 'Soru',
            labelEmpty: 'Soru Boş Olamaz',
            limitRole: 'Aşağıdaki Rollerin Bir Veya Daha Fazlasına Sınırlı Erişim:',
            mandatory: 'Zorunlu',
            maxlength: 'Maksimum Uzunluk',
            minOptionMessage: 'Bu Alan En Az 2 Seçenek Gerektirir',
            multipleFiles: 'Çok Sayıda Dosya',
            name: 'Ad',
            no: 'No',
            number: 'Numara',
            off: 'Off',
            on: 'On',
            option: 'Seçenek',
            optional: 'Seçmeli',
            optionLabelPlaceholder: 'Etiket',
            optionValuePlaceholder: 'Değer',
            optionEmpty: 'Seçenek Değeri Gerekli',
            other: 'Diğer',
            paragraph: 'Paragraf',
            placeholder: 'Yer Tutucu',
            placeholders: {
                value: 'Değer',
                label: 'Etiket',
                text: 'Metin',
                textarea: 'Metin alanı',
                email: 'E-mail Girin',
                placeholder: 'Yer Tutucu',
                className: 'Sınıfları Ayırın',
                password: 'Şifrenizi Girin'
            },
            preview: 'Görüntüle',
            radioGroup: 'Radyo Grup',
            radio: 'Radyo',
            removeMessage: 'Elemanı Sil',
            remove: 'Sil',
            required: 'Zorunlu Alan',
            richText: 'Zengin Metin Editörü',
            roles: 'Yazar Görsün mü?',
            save: 'Kaydet',
            selectOptions: 'Seçenekler',
            select: 'Seç',
            selectColor: 'Renk Seç',
            selectionsMessage: 'Çoklu Seçimlere İzin Ver',
            size: 'Boyut',
            sizes: {
                xs: 'Çok Küçük',
                sm: 'Küçük',
                m: 'Varsayılan',
                lg: 'Büyük'
            },
            style: 'Stil',
            styles: {
                btn: {
                    'default': 'Varsayılan',
                    danger: 'Tehlike',
                    info: 'Bilgi',
                    primary: 'Birincil',
                    success: 'Başarılı',
                    warning: 'Uyarı'
                }
            },
            subtype: 'Tip',
            subtypes: {
                text: ['text', 'password', 'email', 'color'],
                button: ['button', 'submit'],
                header: ['h1', 'h2', 'h3'],
                paragraph: ['p', 'address', 'blockquote', 'canvas', 'output']
            },
            text: 'Metin',
            textArea: 'Metin Alanı',
            toggle: 'Aç-Kapa Fonksiyonu',
            warning: 'Uyarı!',
            value: 'Değer',
            viewXML: '&lt;/&gt;',
            yes: 'Evet'
        }
    };

    var options = {
        editOnAdd: true,
        disableFields: [
            'button',
            'autocomplete',
            'hidden',
            'file',
            'checkbox',
            'paragraph',
            'number'
        ],
        roles: {
            1: 'Author can not see'
        },
        'messages': localeMessages[current_language] || {},
        'formData': $('#journal_review_form_content').text()
    };
    var $fbEditor = $(document.getElementById('fb-editor')),
        $formContainer = $(document.getElementById('fb-rendered-form')),
        formBuilder = $fbEditor.formBuilder(options).data('formBuilder');

    $('.form-builder-save').click(function(e) {
        e.preventDefault();
        $fbEditor.toggle();
        $formContainer.toggle();
        $('#fb-rendered-form-div', $formContainer).formRender({
            formData: formBuilder.formData
        });
    });

    $('#edit-form', $formContainer).click(function(e) {
        $fbEditor.toggle();
        $formContainer.toggle();
    });

    function removeUnnecessaryFields(){
        $('.form-elements .className-wrap').addClass('hidden');
        $('.form-elements .name-wrap').addClass('hidden');
        $.each($('input[name="label"]'), function(index, value){
            var $labelVal = $(value).val();
            var $removeValues = [
                'Onay Kutusu Grubu',
                'Tarih',
                'Başlık',
                'Radyo Grup',
                'Seç',
                'Metin',
                'Metin Alanı',

                'Checkbox Group',
                'Date Field',
                'Header',
                'Radio Group',
                'Select',
                'Text Field',
                'Text Area'
            ];
            if($removeValues.indexOf($labelVal) !== -1){
                $(value).val('');
            }
        });
        $.each($('input[name="placeholder"]'), function(index, value){
            $(value).parent().addClass('hidden');
        });

    }
    //bind to div and on change remove unnecessary fields
    //this lines can be removal, because can trigger an browser crash
    $('#fb-editor').bind("DOMSubtreeModified",function(){
        setTimeout(function(){
            removeUnnecessaryFields();
            formBuilder.save;
            $('#journal_review_form_content').html(formBuilder.formData);
        }, 500);
    });
    removeUnnecessaryFields();
});
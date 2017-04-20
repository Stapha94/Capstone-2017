class ReportService {
    constructor($injector) {
        this.$log = $injector.get('$log');
        this.$http = $injector.get('$http');
        this.baseUrl = $injector.get('CONFIG').DBURL;
        this.notificationService = $injector.get('notificationService');
        this.authService = $injector.get('authService');
    }

    generate(object, fileName) {
        var backendSafeObject = this.sanitizeObject(object);

        var url = this.baseUrl + 'report/download';
        this.$http.post(url, backendSafeObject)
            .then((response) => {
                this.notificationService.success('Successfully downloaded report!');
                this.download(response.data, fileName, 'text/csv;encoding:utf-8');
            })
            .catch((error) => {
                this.notificationService.error('Failed to download report!');
            })
    }

    // Based on code here: http://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
    download(content, fileName, mimeType) {
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';

        if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
            type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
            type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
    }

    sanitizeObject(object) {
        var backendSafeObject = {};
        if(object) {
            if(Array.isArray(object)) {
                backendSafeObject = [];
                var index = 0;
                _.forEach(object, (item) => {
                    backendSafeObject[index] = {};
                    _.forOwn(item, (value, key) => {
                        var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        backendSafeObject[index][newKey] = value;
                    });
                    index++;
                });
            } else {
                _.forOwn(object, (value, key) => {
                    var newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                    backendSafeObject[newKey] = value;
                });
            }
        }
        return backendSafeObject;
    }


}

ReportService.$inject = ['$injector'];
app.service('reportService', ReportService);
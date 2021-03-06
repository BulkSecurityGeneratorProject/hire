(function() {
    'use strict';
    angular
        .module('hireApp')
        .factory('SavedList', SavedList);

    SavedList.$inject = ['$resource', 'DateUtils'];

    function SavedList ($resource, DateUtils) {
        var resourceUrl =  'api/saved-lists/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateCreated = DateUtils.convertDateTimeFromServer(data.dateCreated);
                        data.dateModified = DateUtils.convertDateTimeFromServer(data.dateModified);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

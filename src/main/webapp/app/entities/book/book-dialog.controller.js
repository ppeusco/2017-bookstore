(function() {
    'use strict';

    angular
        .module('bookstoreApp')
        .controller('BookDialogController', BookDialogController);

    BookDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Book', 'Author'];

    function BookDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Book, Author) {
        var vm = this;

        vm.book = entity;
        vm.clear = clear;
        vm.save = save;
        vm.authors = Author.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.book.id !== null) {
                Book.update(vm.book, onSaveSuccess, onSaveError);
            } else {
                Book.save(vm.book, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('bookstoreApp:bookUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

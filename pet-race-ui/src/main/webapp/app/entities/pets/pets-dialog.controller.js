(function() {
    'use strict';

    angular
        .module('gpmrApp')
        .controller('PetsDialogController', PetsDialogController);

    PetsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pets'];

    function PetsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pets) {
        var vm = this;
        vm.pets = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('gpmrApp:petsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.pets.id !== null) {
                Pets.update(vm.pets, onSaveSuccess, onSaveError);
            } else {
                Pets.save(vm.pets, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
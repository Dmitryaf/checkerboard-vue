import { ref } from 'vue';

export default function useDetails() {
  const detailFields = {
    cost: 'Цена (₽)',
    status: 'Статус',
    type: 'Тип объекта',
    floor: 'Этаж',
    number: 'Номер квартиры',
    square: 'Площадь объекта (кв.м)',
    plan_type: 'Тип планировки',
    subsidy: 'Cубсидированная',
    marginal: 'Маржинальная',
    renovation: 'C ремонтом',
    installment: 'C рассрочкой',
  };

  const detailOptions = ref({
    cost: false,
    square: false,
    status: false,
    type: false,
    floor: false,
    number: false,
    plan_type: false,
    subsidy: false,
    marginal: false,
    renovation: false,
    installment: false,
  });

  let optionsForDisplay = ref([]);

  function getTrueOptions(options) {
    if (Object.keys(options).length) {
      for (const option in options) {
        if (options[option]) {
          optionsForDisplay.value.push(option);
        }
      }
    }
  }

  function convertValue(value) {
    if (typeof value === 'boolean') {
      return value ? 'Да' : 'Нет';
    }
    return value;
  }

  return {
    detailFields,
    detailOptions,
    optionsForDisplay,
    getTrueOptions,
    convertValue,
  };
}

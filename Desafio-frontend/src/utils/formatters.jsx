import { format } from "date-fns";

export function removeCaracterEspecial(remove) {
    remove.replace(/[^\d]/g, '')
}

export function handleSum(value) {
    let somaValores = 0;
    value.forEach(objeto => {
        somaValores += objeto.valor;
    });
    return somaValores
}

export function formatToMoney(value) {
    return value.toLocaleString('pt-br',
        { style: 'currency', currency: 'BRL' }
    );
}

export function formatToDate(date) {
    const generatedDate = new Date(date);

    return format(generatedDate, 'dd/MM/yyyy');
}
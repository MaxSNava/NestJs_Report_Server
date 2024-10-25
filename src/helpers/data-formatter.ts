export class DateFormatte {
  static formatter = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  static getDDMMYYYY = (date: Date) => DateFormatte.formatter.format(date);
}
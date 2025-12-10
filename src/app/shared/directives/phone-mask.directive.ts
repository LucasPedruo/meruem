import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {
  @Input() maxLength: number = 15;

  constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Remove todos os caracteres que não são números
    value = value.replace(/\D/g, '');
    
    // Aplica limite de caracteres
    if (value.length > this.maxLength) {
      value = value.substring(0, this.maxLength);
    }
    
    // Aplica máscara brasileira para telefone
    value = this.applyBrazilianPhoneMask(value);
    
    // Atualiza o valor do input
    if (input.value !== value) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    
    // Limpa e aplica máscara nos dados colados
    const cleanedData = pastedData.replace(/\D/g, '').substring(0, this.maxLength);
    const maskedData = this.applyBrazilianPhoneMask(cleanedData);
    
    const input = event.target as HTMLInputElement;
    input.value = maskedData;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  private applyBrazilianPhoneMask(value: string): string {
    value = value.replace(/^0+/, '');
    
    if (value.length === 0) return '';
    
    // Telefone fixo: (XX) XXXX-XXXX
    if (value.length <= 8) {
      return value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    }
    
    // Celular: (XX) 9XXXX-XXXX 
    if (value.length <= 11) {
      return value.replace(/(\d{2})(\d{1})(\d{4})(\d+)/, '($1) $2$3-$4');
    }
    
    // Para números internacionais ou com mais de 11 dígitos
    return value;
  }
}

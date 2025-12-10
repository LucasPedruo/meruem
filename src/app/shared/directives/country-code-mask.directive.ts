import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCountryCodeMask]',
  standalone: true
})
export class CountryCodeMaskDirective {
  @Input() maxLength: number = 4; 

  constructor(private elementRef: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    
    // Detecta quando o usuário pressiona Backspace ou Delete
    if (event.key === 'Backspace' || event.key === 'Delete') {
      input.dataset['userEditing'] = 'true';
      
      // Se está tentando apagar selecionado tudo ou o último caractere
      if (input.value === '+55' && input.selectionStart === 0 && input.selectionEnd === 3) {
        event.preventDefault();
        input.value = '+';
        input.setSelectionRange(1, 1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (input.value === '+55' && input.selectionStart === 3) {
        event.preventDefault();
        input.value = '+5';
        input.setSelectionRange(2, 2);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    
    if (event.key.length === 1 && /[\d+]/.test(event.key)) {
      input.dataset['userEditing'] = 'true';
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    value = value.replace(/[^\d+]/g, '');
    
    // Garante que o + seja sempre o primeiro caractere
    if (!value.startsWith('+')) {
      value = value.replace(/^\+*/, '');
      if (value.length > 0) {
        value = '+' + value;
      }
    }
    
    value = value.replace(/\+{2,}/g, '+');
    
    // Aplica limite de caracteres (incluindo o +)
    if (value.length > this.maxLength + 1) {
      value = value.substring(0, this.maxLength + 1);
    }
    
    if (value === '+' || value === '') {
      if (input.dataset['userEditing'] !== 'true') {
        value = '+55';
      }
    }
    
    // Atualiza o valor do input
    if (input.value !== value) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.dataset['userEditing'] = 'false';
    
    if (input.value === '+55') {
      input.select();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    // Se o campo ficou vazio ou só com +, restaura o padrão
    if (input.value === '+' || input.value === '') {
      input.value = '+55';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Reset da flag de edição
    input.dataset['userEditing'] = 'false';
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    
    // Limpa e aplica formatação nos dados colados
    let cleanedData = pastedData.replace(/[^\d+]/g, '');
    cleanedData = cleanedData.replace(/\+{2,}/g, '+');
    
    if (!cleanedData.startsWith('+')) {
      cleanedData = '+' + cleanedData;
    }
    
    if (cleanedData.length > this.maxLength + 1) {
      cleanedData = cleanedData.substring(0, this.maxLength + 1);
    }
    
    if (cleanedData === '+' || cleanedData === '') {
      cleanedData = '+55';
    }
    
    const input = event.target as HTMLInputElement;
    input.value = cleanedData;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

export interface UserCreationData {
  fullName: string;           // Nome completo
  email: string;              // Email
  password: string;           // Senha
  code: string;               // Código do usuário (gerado pelo sistema)
  nuit: string;               // NUIT - Número de Identificação Fiscal
  msisdn: string;             // Número de telefone
  address: string;            // Endereço físico
  dateOfBirth?: string;       // Data de nascimento (opcional)
  gender?: "M" | "F" | "Other"; // Sexo
  role?: "Cliente" | "Funcionario" | "Administrador"; // Papel do usuário
  notes?: string;             // Observações adicionais
  isActive?: boolean;         // Usuário ativo ou não
  registrationDate?: string;  // Data de registro
  nationality?: string;       // Nacionalidade
  maritalStatus?: string;     // Estado civil
  occupation?: string;        // Profissão
  preferredPaymentMethod?: "M-pesa" | "E-mola" | "M-kesh" | "Millenium Bim" | "BCI"; // Método de pagamento preferido
  loyaltyPoints?: number;     // Pontos de fidelidade do cliente
}

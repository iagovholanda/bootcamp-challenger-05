import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionRequest): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    /* Verificando se o valor total que temos disponivel é menor do que o valor
    de uma possivel saida. Caso isso seja veridico, um error é retornado. */
    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;

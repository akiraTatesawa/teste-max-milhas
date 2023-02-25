import { CpfDTO } from "@app/dtos/cpf.dto";
import { CPFViewModel } from "../view-models/cpf.view-model";

export class CPFPresenter {
  public static toViewModel(dto: CpfDTO): CPFViewModel {
    return {
      cpf: dto.cpf,
      createdAt: dto.createdAt,
    };
  }

  public static bulkToViewModel(dtos: CpfDTO[]): CPFViewModel[] {
    return dtos.map((dto) => CPFPresenter.toViewModel(dto));
  }
}

import { CPFFactory } from "@tests/factories/cpf-factory";
import { InMemoryCPFRepository } from "@tests/repositories/in-memory-cpf-repository";
import { ListAllCPFsUseCase } from "./list-all-cpfs.use-case";

describe("List All CPFs Use Case", () => {
  let cpfRepository: InMemoryCPFRepository;
  let sut: ListAllCPFsUseCase;

  beforeEach(async () => {
    cpfRepository = new InMemoryCPFRepository();
    sut = new ListAllCPFsUseCase(cpfRepository);
  });

  describe("Success", () => {
    it("Should be able to list all the CPFs in the shortlist", async () => {
      await Promise.allSettled([
        cpfRepository.create(CPFFactory.generate("13287138901")),
        cpfRepository.create(CPFFactory.generate("05668704106")),
        cpfRepository.create(CPFFactory.generate("37377646209")),
      ]);

      const allCPFsResult = await sut.execute();

      expect(allCPFsResult.isRight()).toEqual(true);
      expect(allCPFsResult.result).toBeInstanceOf(Array);
      expect(allCPFsResult.result).toHaveLength(3);
      // @ts-ignore
      expect(allCPFsResult.result[0]).toHaveProperty("id", expect.any(String));
      // @ts-ignore
      expect(allCPFsResult.result[0]).toHaveProperty("cpf", expect.any(String));
      // @ts-ignore
      expect(allCPFsResult.result[0]).toHaveProperty("createdAt", expect.any(Date));
    });

    it("Should return an empty array if there are no CPFs in the shortlist", async () => {
      const allCPFsResult = await sut.execute();

      expect(allCPFsResult.isRight()).toEqual(true);
      expect(allCPFsResult.result).toBeInstanceOf(Array);
      expect(allCPFsResult.result).toHaveLength(0);
    });
  });
});

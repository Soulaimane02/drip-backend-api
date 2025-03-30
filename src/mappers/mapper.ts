interface IMapper<Entity, RequestDTO, ResponseDTO> {
  toEntity: (dto: RequestDTO) => Entity;
  toRequestDTO: (entity: Entity) => RequestDTO;
  toResponseDTO: (entity: Entity) => ResponseDTO;
}

export default IMapper;

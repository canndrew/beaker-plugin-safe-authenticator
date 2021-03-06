import ref from 'ref';
import StructType from 'ref-struct';
import Enum from 'enum';

export const u8 = ref.types.uint8;
export const u32 = ref.types.uint32;
export const u64 = ref.types.uint64;
export const usize = ref.types.size_t;
export const bool = ref.types.bool;
export const int32 = ref.types.int32;
export const Void = ref.types.void;
export const Null = ref.NULL;
export const CString = ref.types.CString;

// Pointer Types
export const voidPointer = ref.refType(Void);
export const ClientHandlePointer = ref.refType(voidPointer);

export const AppExchangeInfo = StructType({
  id: CString,
  scope: CString,
  name: CString,
  vendor: CString
});

export const Permission = new Enum({
  Read: 0,
  Insert: 1,
  Update: 2,
  Delete: 3,
  ManagePermissions: 4
});

export const ContainerPermissions = StructType({
  cont_name: CString,
  access: ref.refType(Permission),
  access_len: usize,
  access_cap: usize
});

export const RegisteredApp = StructType({
  app_info: AppExchangeInfo,
  containers: ref.refType(ContainerPermissions),
  containers_len: usize,
  containers_cap: usize
});

export const RegisteredAppPointer = ref.refType(RegisteredApp);

export const AuthReq = StructType({
  app: AppExchangeInfo,
  app_container: bool,
  containers: ref.refType(ContainerPermissions),
  containers_len: usize,
  containers_cap: usize
});

export const AuthReqPointer = ref.refType(AuthReq);

export const ContainersReq = StructType({
  app: AppExchangeInfo,
  containers: ref.refType(ContainerPermissions),
  containers_len: usize,
  containers_cap: usize
});

export const FfiResult = StructType({
  error_code: int32,
  description: CString
});

export const AccountInfo = StructType({
  mutations_done: u64,
  mutations_available: u64
});

export const AccountInfoPointer = ref.refType(AccountInfo);

export const ContainersReqPointer = ref.refType(ContainersReq);

export const allocAppHandlePointer = () => (ref.alloc(ClientHandlePointer));

export const allocCString = (str) => (ref.allocCString(str));

export const allocAuthReq = (req) => (ref.alloc(AuthReq, req));

export const allocContainerReq = (req) => (ref.alloc(ContainersReq, req));

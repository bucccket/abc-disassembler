import { custom, d64, s32, u30, u32, incrementedVector, optional } from "../defined-transformer-types";
import { Structure } from "../structure";
import { MultinameInfo } from "./multiname-info";
import { NamespaceInfo } from "./namespace-info";
import { NSSetInfo } from "./namespace-set-info";

export class CPoolInfo extends Structure {
    integer: incrementedVector<s32, u30> = [];
    uinteger: incrementedVector<u32, u30> = [];
    double: incrementedVector<d64, u30> = [];
    string: incrementedVector<string, u30> = [];
    namespace: incrementedVector<custom<NamespaceInfo>, u30> = [];
    ns_set: incrementedVector<custom<NSSetInfo>, u30> = [];
    multiname: incrementedVector<custom<MultinameInfo>, u30> = [];
}
NamespaceInfo;
NSSetInfo;
MultinameInfo;
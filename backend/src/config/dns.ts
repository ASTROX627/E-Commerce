import dns from "node:dns";
import { DNS_SERVERS } from "./global.ts";

export function configureDNS() {
  if (DNS_SERVERS.length) {
    dns.setServers(DNS_SERVERS);
  }
}

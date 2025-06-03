#!/bin/bash

PHP_BIN="/opt/lampp/bin/php"
VERIFY_DOMAIN="/opt/lampp/htdocs/verify_email/includes/verify_domain.php"
VERIFY_SMTP="/opt/lampp/htdocs/verify_email/includes/verify_smtp.php"
LOG_FILE="/opt/lampp/htdocs/verify_email/verification.log"
MAX_LOG_SIZE=500000  # ~500 KB

log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

rotate_log_if_needed() {
  if [ -f "$LOG_FILE" ] && [ $(stat -c%s "$LOG_FILE") -ge $MAX_LOG_SIZE ]; then
    mv "$LOG_FILE" "$LOG_FILE.bak"
    touch "$LOG_FILE"
    log "Log rotated due to size limit."
  fi
}

while true; do
  rotate_log_if_needed

  log "Starting domain verification..."
  $PHP_BIN "$VERIFY_DOMAIN" > /dev/null 2>&1
  DOMAIN_EXIT_CODE=$?
  log "Domain verification exit code: $DOMAIN_EXIT_CODE"

  if [ $DOMAIN_EXIT_CODE -eq 0 ]; then
    log "Domain verified. Starting SMTP verification..."
    $PHP_BIN "$VERIFY_SMTP" > /dev/null 2>&1
    SMTP_EXIT_CODE=$?
    log "SMTP verification exit code: $SMTP_EXIT_CODE"
  else
    log "Domain verification failed. Retrying after 30 seconds..."
  fi

  sleep 30
done

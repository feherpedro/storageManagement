package hu.pte.mik.bpnh16.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(hu.pte.mik.bpnh16.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.ProductCategory.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.PriceCategory.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.Status.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.OrderEntity.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.OrderItem.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.StockTaking.class.getName(), jcacheConfiguration);
            cm.createCache(hu.pte.mik.bpnh16.domain.StockTakingItem.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
